import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BpmnService } from '../../services/bpmn.service';

import 'script-loader!babel-loader!x2js/x2js.js';

import debounce from 'lodash/function/debounce';

const tmlConfig = require('./resource/tml.json');
import newDiagramXML from './resource/new-diagram.bpmn';

import pizzaXML from './resource/pizza-collaboration.bpmn';
import testXML from './resource/test.bpmn';

@Component({
    selector: 'bpmn',
    templateUrl: './bpmn.component.html',
    styleUrls: ['./bpmn.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BpmnComponent implements OnInit {

    viewer: any;
    title: String = "BPMN !";
    tmlDetails: any;

    @ViewChild('downloadDiagram') downloadDiagram: ElementRef;
    @ViewChild('downloadSVG') downloadSVG: ElementRef;

    parser: DOMParser = new DOMParser();
    bpmnIdDict: any = {};

    constructor(
        private wfElement: ElementRef,
        private http: HttpClient,
        private bpmnService: BpmnService
    ) { }

    ngOnInit () { }

    ngOnDestroy () {
        // this.viewer.destroy();
    }

    ngAfterViewInit () {
        let minimapModule = this.bpmnService.getMinimapModule();
        let options = {
            container: '#canvas',
            additionalModules: [
                minimapModule
            ],
            moddleExtensions: {
              tml: tmlConfig
            }
        };

        // this.viewer = this.bpmnService.getViewerInstance(options);
        this.viewer = this.bpmnService.getModelerInstance(options);

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

            // console.log(JSON.stringify(businessObject, null, 2));
            console.log(businessObject);

            if (!element.parent) {
                return;
            }

            this.tmlDetails = this.getExtension(businessObject, 'tml:Details');

            if (!this.tmlDetails) {
                this.tmlDetails = moddle.create('tml:Details');
                businessObject.extensionElements = businessObject.extensionElements || moddle.create('bpmn:ExtensionElements');
                businessObject.extensionElements.get('values').push(this.tmlDetails);
            }

            // this.tmlDetails.data = JSON.stringify({});
        });
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
        this.viewer.saveXML({ format: true }, function(err, xml) {
            done(err, xml);
        });
    }

    exportXML () {
        this.viewer.saveXML({ format: true }, function(err, xml) {
            if (!err) console.log(xml);
        });
    }
    
    exportJSON () {
        this.viewer.saveXML({ format: true }, (err, xml) => {
            // let x2js = new X2JS();
            // if (!err) console.log(x2js.xml2js(xml));
            let xmlDom = this.parser.parseFromString(xml, 'application/xml');
            // console.log(xmlDom.childNodes[0].childNodes);
            this.preprocess(xmlDom.children[0].children);
            console.log(this.bpmnIdDict);
        });
    }

    preprocess (nodeList: NodeList) {
        let list = Array.prototype.slice.call(nodeList);
        for (let node of list) {
            if (node.nodeName === 'bpmn:process'
                || node.nodeName === 'bpmn:subProcess') this.preprocess(node.children);
            if (node.nodeName === 'bpmn:startEvent'
                || node.nodeName === 'bpmn:endEvent'
                || node.nodeName === 'bpmn:task'
                || node.nodeName === 'bpmn:exclusiveGateway'
                || node.nodeName === 'bpmn:parallelGateway'
                || node.nodeName === 'bpmn:sequenceFlow') {
                this.bpmnIdDict[node.id] = node;
            }
        }
        return ;
    }

    buildJSON (root: Node) {

    }
    
    newDiagram () {
        this.viewer.importXML(newDiagramXML, err => {
            if (err) return console.log('error rendering', err);

            let canvas = this.viewer.get('canvas');

            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
        });
    }

    loadXML () {
        this.viewer.importXML(pizzaXML, err => {
            if (err) return console.log('error rendering', err);

            let canvas = this.viewer.get('canvas');

            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
        });
    }
    
    loadTestXML () {
        this.viewer.importXML(testXML, err => {
            if (err) return console.log('error rendering', err);

            let canvas = this.viewer.get('canvas');

            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
        });
    }
}