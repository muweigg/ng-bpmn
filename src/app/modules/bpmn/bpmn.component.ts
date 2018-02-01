import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BpmnService } from './service/bpmn.service';

import defer from 'lodash/defer';
import find from 'lodash/find';
import debounce from 'lodash/debounce';
import svgAttr from 'tiny-svg/lib/attr';

import newDiagramXML from './resource/new-diagram.bpmn';

export const onSettings: EventEmitter<any> = new EventEmitter<any>();

@Component({
    selector: 'bpmn',
    templateUrl: './bpmn.component.html',
    styleUrls: ['./bpmn.component.scss'],
})
export class BpmnComponent implements OnInit {

    // 当前已加载 XML
    xml: string = '';
    @Input() modeler: boolean = false;
    @Input() navigated: boolean = true;
    @Input() tokenSimulation: boolean = false;
    @Input() allowDownload: boolean = false;
    @Input() language: any = {};
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSettings: EventEmitter<any> = onSettings;
    @ViewChild('downloadDiagram') downloadDiagram: ElementRef;
    @ViewChild('downloadSVG') downloadSVG: ElementRef;

    hideKeyboardShortcuts: boolean = true;
    
    parser: DOMParser = new DOMParser();
    viewer: any;
    bpmnNodeIndex: any = {};

    constructor(
        private http: HttpClient,
        private bpmnService: BpmnService
    ) { }

    ngOnInit () { }

    ngOnDestroy () {
        this.destroy();
        this.xml = '';
    }

    ngAfterViewInit () {
        this.createViewer();
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes.modeler) this.setDefault(changes, 'modeler');
        if (changes.navigated) this.setDefault(changes, 'navigated');
        if (changes.tokenSimulation) this.setDefault(changes, 'tokenSimulation');
        if (changes.modeler || changes.navigated || changes.tokenSimulation) {
            if (this.viewer) {
                this.destroy();
                this.createViewer();
            }
        }
    }
    
    createViewer () {
        let xml: string = this.xml === '' ? newDiagramXML: this.xml;
        let translateModule = this.bpmnService.getTranslateModule(this.language);
        let options: any = {
            container: '#bpmn-canvas',
            keyboard: { bindTo: document },
            additionalModules: [ translateModule ],
        }
        
        this.viewer = this.modeler
            ? this.bpmnService.getModelerInstance(options, this.tokenSimulation)
            : this.navigated ? this.bpmnService.getNavigatedViewerInstance(options, this.tokenSimulation) : this.bpmnService.getViewerInstance(options, this.tokenSimulation);

        this.viewer.importXML(xml, err => {
            if (err) return console.log('error rendering', err);
            this.resetZoom();
        });

        this.viewer.on('commandStack.changed', this.exportArtifacts());
        
        this.viewer.on('element.click', event => {
            var element = event.element,
                moddle = this.viewer.get('moddle'),
                businessObject = element.businessObject;
            if (!element.parent) return;
            this.onClick.emit(businessObject);
        });
    }

    exportArtifacts () {
        return debounce(() => {
            if (!this.viewer) return;
            this.saveSVG((err, svg) => {
                this.setEncoded(this.downloadSVG.nativeElement, 'diagram.svg', err ? null : svg);
            });
            this.saveDiagram((err, xml) => {
                this.setEncoded(this.downloadDiagram.nativeElement, 'diagram.bpmn', err ? null : xml);
                this.xml = xml;
            });
        }, 500);
    }

    setDefault (changes, name: any, defaultVal: any = true, type: any = 'boolean') {
        this[name] = typeof changes[name].currentValue === type
            ? changes[name].currentValue
            : defaultVal;
    }
    
    getExtension(element, type) {
        if (!element.extensionElements) {
            return null;
        }

        return element.extensionElements.values.filter(function(e) {
            return e.$instanceOf(type);
        })[0];
    }

    setEncoded (link, name, data) {
        var encodedData = encodeURIComponent(data);
    
        if (data) {
            link.classList.add('active');
            link.href = `data:application/bpmn20-xml;charset=UTF-8,${encodedData}`;
            link.download = name
        } else {
            link.classList.remove('active');
        }
    }

    saveSVG (done) {
        this.viewer.saveSVG(done);
    }
      
    saveDiagram (done) {
        this.viewer.saveXML({ format: true }, (err, xml) => done(err, xml));
    }
    
    exportXML () {
        let xxml:any = null;
        this.viewer.saveXML({ format: true }, (err, xml) => {
            if (!err) xxml = xml;
        });
        return xxml;
    }
    
    exportJSON () {
        let json:any = null;
        this.viewer.saveXML({ format: true }, (err, xml) => {
            let xmlDom = this.parser.parseFromString(xml, 'application/xml');
            json = this.buildJSON(this.preprocess(xmlDom.children[0].children));
        });
        // console.log(this.bpmnNodeIndex);
        return json;
    }
/* 
    preprocess (nodeList: NodeList, index: any = {}) {
        let list = Array.prototype.slice.call(nodeList);
        for (let node of list) {
            if (node.nodeName === 'bpmn:process'
                || node.nodeName === 'bpmn:subProcess') this.preprocess(node.children, index);

            if (node.nodeName !== 'bpmn:process') {

                this.bpmnNodeIndex[node.id] = node;
                    
                let bsO = {};
                bsO['bpmnId'] = node.id;
                bsO['name'] = '';
                bsO['type'] = node.nodeName;

                if (node.nodeName === 'bpmn:startEvent' && node.parentElement.nodeName === 'bpmn:process') bsO['root'] = true;

                if (node.nodeName === 'bpmn:subProcess')
                    bsO['startEvent'] = Array.prototype.slice.call(node.children)
                        .filter(node => node.nodeName === 'bpmn:startEvent')
                        .map(node => node.id);

                if (node.children.length > 0) {
                    let children = Array.prototype.slice.call(node.children);

                    let incoming = children.filter(child => {
                        if (child.nodeName === 'bpmn:incoming') return child.innerHTML;
                    }).map(incoming => incoming.innerHTML);

                    let outgoing = children.filter(child => {
                        if (child.nodeName === 'bpmn:outgoing') return child;
                    }).map(outgoing => outgoing.innerHTML);

                    if (incoming.length > 0) bsO['incoming'] = incoming;
                    if (outgoing.length > 0) bsO['outgoing'] = outgoing;
                }

                if (node.attributes.length > 1) {
                    let attributes = Array.prototype.slice.call(node.attributes);
                    let options = attributes.filter(attr => attr.nodeName === 'tml:options')[0];
                    if (options) {
                        try { bsO['options'] = JSON.parse(options.nodeValue); }
                        catch (e) { bsO['options'] = options.nodeValue; }
                    }
                    let name = attributes.filter(attr => attr.nodeName === 'name')[0];
                    if (name) bsO['name'] = name.nodeValue;
                }

                index[node.id] = bsO;
            }
        }
        return index;
    }

    buildJSON (index: any = {}) {
        let startEvent = null;

        for (let key in index) {

            let bsO = index[key];

            if (bsO.incoming && bsO.incoming.length > 0) {
                bsO.incoming = bsO.incoming.map(id => {
                    let node = this.bpmnNodeIndex[id];
                    for (let attr of node.attributes) {
                        if (attr.name === 'sourceRef')
                            return index[attr.nodeValue];
                    }
                });
            }
            
            if (bsO.outgoing && bsO.outgoing.length > 0) {
                bsO.outgoing = bsO.outgoing.map(id => {
                    let node = this.bpmnNodeIndex[id];
                    for (let attr of node.attributes) {
                        if (attr.name === 'targetRef')
                            return index[attr.nodeValue];
                    }
                });
            }
            
            if (bsO.type === 'bpmn:subProcess')
                bsO.startEvent = index[bsO.startEvent];

            if (bsO.root) startEvent = bsO;
        }

        return { startEvent };
    }
 */

    preprocess (nodeList: NodeList, processId: string = '', index: any = {}) {
        let catgoryIdx = {
            'bpmn:startEvent': 0,
            'bpmn:endEvent': 10,
            'bpmn:exclusiveGateway': 1,
            'bpmn:parallelGateway': 4,
            'bpmn:task': 2,
            'bpmn:userTask': 5,
            'bpmn:subProcess': 3,
        };
        let list = Array.prototype.slice.call(nodeList);
        for (let node of list) {
            if (node.nodeName === 'bpmn:process'
                || node.nodeName === 'bpmn:subProcess') this.preprocess(node.children, node.id, index);

            if (node.nodeName !== 'bpmndi:BPMNDiagram' && node.nodeName !== 'bpmn:process') {

                this.bpmnNodeIndex[node.id] = node;
                    
                let bsO = {};
                bsO['prcsid'] = node.id;
                bsO['processname'] = '';
                bsO['type'] = node.nodeName;
                bsO['group'] = processId;
                bsO['catgory'] = catgoryIdx[node.nodeName];
                bsO['is_begin'] = node.nodeName === 'bpmn:startEvent';
                bsO['is_end'] = node.nodeName === 'bpmn:endEvent';
                
                if (node.nodeName === 'bpmn:startEvent' && node.parentElement.nodeName === 'bpmn:process') bsO['root'] = true;

                if (node.children.length > 0) {
                    let children = Array.prototype.slice.call(node.children);

                    let incoming = children.filter(child => {
                        if (child.nodeName === 'bpmn:incoming') return child.innerHTML;
                    }).map(incoming => incoming.innerHTML);

                    let outgoing = children.filter(child => {
                        if (child.nodeName === 'bpmn:outgoing') return child;
                    }).map(outgoing => outgoing.innerHTML);

                    if (incoming.length > 0) bsO['processup'] = incoming;
                    if (outgoing.length > 0) bsO['processto'] = outgoing;
                }

                if (node.attributes.length > 1) {
                    let attributes = Array.prototype.slice.call(node.attributes);
                    let options = attributes.filter(attr => attr.nodeName === 'tml:options')[0];
                    if (options) {
                        try { bsO['options'] = JSON.parse(options.nodeValue); }
                        catch (e) { bsO['options'] = options.nodeValue; }
                    }
                    let name = attributes.filter(attr => attr.nodeName === 'name')[0];
                    if (name) bsO['processname'] = name.nodeValue;
                }

                index[node.id] = bsO;
            }
        }
        return index;
    }

    buildJSON (index: any = {}) {
        let nodes = [];

        for (let key of Object.keys(index)) {
            if (!/^SequenceFlow.*/i.test(key))
                nodes.push(index[key]);
        }

        for (let i in nodes) {
            
            let bsO = nodes[i];

            if (bsO.processup && bsO.processup.length > 0) {
                bsO.processup = bsO.processup.map(id => {
                    let node = this.bpmnNodeIndex[id];
                    for (let attr of node.attributes) {
                        if (attr.name === 'sourceRef')
                            return index[attr.nodeValue].prcsid;
                    }
                });
            }
            
            if (bsO.processto && bsO.processto.length > 0) {
                bsO.processto = bsO.processto.map(id => {
                    let node = this.bpmnNodeIndex[id];
                    for (let attr of node.attributes) {
                        if (attr.name === 'targetRef')
                            return index[attr.nodeValue].prcsid;
                    }
                });
            }
        }

        return nodes.filter(node => node.prcsid !== '');
    }
    newDiagram () {
        this.viewer.importXML(newDiagramXML, err => {
            if (err) return console.log('error rendering', err);
            this.resetZoom();
        });
    }

    loadXML (xml) {
        if (!this.viewer) return;
        this.viewer.importXML(xml, err => {
            if (err) return console.log('error rendering', err);
            this.resetZoom();
            this.xml = xml;
            if (!this.modeler) this.exportArtifacts()();
        });
    }

    resetZoom () {
        if (!this.viewer) return;
        let canvas = this.viewer.get('canvas');
        defer(() => canvas.zoom('fit-viewport'));
    }

    nodePathHighlighted(ids: Array<any> = []) {

        if (!this.viewer || (ids && ids.length === 0)) return;
        
        function setColor (item) {
            const task = document.querySelector(`g[data-element-id='${item.id}'] .djs-visual`).children[0];
            const text = task.nextSibling;
            svgAttr(task, item.color.task);
            if (text && item.color.text) svgAttr(text, item.color.text);
        }

        ids.map((item:any) => setColor(item));

    }

    toggleHideKeyboardShortcuts () {
        this.hideKeyboardShortcuts = !this.hideKeyboardShortcuts;
    }

    destroy () {
        if (this.viewer) {
            this.viewer.destroy();
            this.viewer = null;
        }
    }
}