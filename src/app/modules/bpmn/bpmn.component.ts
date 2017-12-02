import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BpmnService } from './service/bpmn.service';

// import 'script-loader!babel-loader!x2js/x2js.js';

import debounce from 'lodash/function/debounce';

const tmlOptions = require('./resource/options.json');
import newDiagramXML from './resource/new-diagram.bpmn';

@Component({
    selector: 'bpmn',
    templateUrl: './bpmn.component.html',
    styleUrls: ['./bpmn.component.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class BpmnComponent implements OnInit {

    @Input() modeler: boolean = false;
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('downloadDiagram') downloadDiagram: ElementRef;
    @ViewChild('downloadSVG') downloadSVG: ElementRef;
    
    parser: DOMParser = new DOMParser();
    viewer: any;
    tmlDetails: any;
    bpmnNodeIndex: any = {};    

    constructor(
        private http: HttpClient,
        private bpmnService: BpmnService
    ) { }

    ngOnInit () { }

    ngOnDestroy () {
        // this.viewer.destroy();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.modeler) this.setDefault(changes, 'modeler');
    }

    ngAfterViewInit () {
        let minimapModule = this.bpmnService.getMinimapModule();
        let options = {
            container: '#bpmn-canvas',
            additionalModules: [
                minimapModule
            ],
            moddleExtensions: {
              tml: tmlOptions
            }
        };
        
        this.viewer = this.modeler
            ? this.bpmnService.getModelerInstance(options)
            : this.bpmnService.getViewerInstance(options);

        this.viewer.importXML(newDiagramXML, err => {
            if (err) return console.log('error rendering', err);
            let canvas = this.viewer.get('canvas');
            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
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

    exportArtifacts () {
        return debounce(() => {
            this.saveSVG((err, svg) => {
                this.setEncoded(this.downloadSVG.nativeElement, 'diagram.svg', err ? null : svg);
            });
            this.saveDiagram((err, xml) => {
                this.setEncoded(this.downloadDiagram.nativeElement, 'diagram.bpmn', err ? null : xml);
            });
        }, 500);
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
        return json;
    }

    preprocess (nodeList: NodeList, index: any = {}) {
        let list = Array.prototype.slice.call(nodeList);
        for (let node of list) {
            if (node.nodeName === 'bpmn:process'
                || node.nodeName === 'bpmn:subProcess') this.preprocess(node.children, index);

            if (node.nodeName === 'bpmn:startEvent'
                || node.nodeName === 'bpmn:endEvent'
                || node.nodeName === 'bpmn:task'
                || node.nodeName === 'bpmn:subProcess'
                || node.nodeName === 'bpmn:exclusiveGateway'
                || node.nodeName === 'bpmn:parallelGateway'
                || node.nodeName === 'bpmn:sequenceFlow') {

                this.bpmnNodeIndex[node.id] = node;
                    
                let bsO = {};
                bsO['bpmnId'] = node.id;
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

    newDiagram () {
        this.viewer.importXML(newDiagramXML, err => {
            if (err) return console.log('error rendering', err);
            let canvas = this.viewer.get('canvas');
            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
        });
    }

    loadXML (xml) {
        this.viewer.importXML(xml, err => {
            if (err) return console.log('error rendering', err);
            let canvas = this.viewer.get('canvas');
            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
        });
    }
}