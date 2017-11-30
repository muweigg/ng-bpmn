import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BpmnService } from '../../services/bpmn.service';

import $ from 'jquery';
import debounce from 'lodash/function/debounce';

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

    @ViewChild('downloadDiagram') downloadDiagram: ElementRef;
    @ViewChild('downloadSVG') downloadSVG: ElementRef;

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
            ]
        };

        // this.viewer = this.bpmnService.getViewerInstance(options);
        this.viewer = this.bpmnService.getModelerInstance(options);

        this.viewer.importXML(testXML, err => {
            if (err) {
                return console.log('error rendering', err);
            }

            let canvas = this.viewer.get('canvas');
            let overlays = this.viewer.get('overlays');

            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
        });
        
        let exportArtifacts: any = debounce(() => {
            this.saveSVG((err, svg) => {
                this.setEncoded(this.downloadSVG.nativeElement, 'diagram.svg', err ? null : svg);
            });
            this.saveDiagram((err, xml) => {
                this.setEncoded(this.downloadDiagram.nativeElement, 'diagram.bpmn', err ? null : xml);
            });
        }, 500);

        this.viewer.on('commandStack.changed', exportArtifacts);
    }

    newDiagram () {
        this.viewer.importXML(newDiagramXML, err => {
            if (err) {
                return console.log('error rendering', err);
            }

            let canvas = this.viewer.get('canvas');
            let overlays = this.viewer.get('overlays');

            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
        });
    }

    loadXML () {
        this.viewer.importXML(pizzaXML, err => {
            if (err) {
                return console.log('error rendering', err);
            }

            let canvas = this.viewer.get('canvas');
            let overlays = this.viewer.get('overlays');

            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
        });
    }

    setEncoded (link, name, data) {
        var encodedData = encodeURIComponent(data);
    
        if (data) {
            $(link).addClass('active').attr({
                'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
                'download': name
            });
        } else {
            $(link).removeClass('active');
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
}