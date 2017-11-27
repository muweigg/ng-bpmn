import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BpmnService } from '../../services/bpmn.service';

import pizzaXML from './resource/pizza-collaboration.bpmn';

@Component({
    selector: 'bpmn',
    templateUrl: './bpmn.component.html',
    styleUrls: ['./bpmn.component.scss']
})
export class BpmnComponent implements OnInit {

    viewer: any;
    title: String = "BPMN !";

    constructor(
        private wfElement: ElementRef,
        private http: HttpClient,
        private bpmnService: BpmnService
    ) { }

    ngOnInit() { }

    ngOnDestroy() {
        this.viewer.destroy();
    }

    ngAfterViewInit() {
        let BpmnViewer = this.bpmnService.getViewer();
        let BpmnModeler = this.bpmnService.getModeler();
        let minimapModule = this.bpmnService.getMinimap();
        console.log('BpmnModeler: ', BpmnModeler);
        // this.viewer = new BpmnViewer({ container: '#canvas' });
        this.viewer = new BpmnModeler({
            container: '#canvas',
            additionalModules: [
                minimapModule
            ]
        });
        // this.viewer.createDiagram();
        this.viewer.importXML(pizzaXML, err => {
            if (err) {
                return console.log('error rendering', err);
            }

            let canvas = this.viewer.get('canvas');
            let overlays = this.viewer.get('overlays');

            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
        });
        console.log(this.viewer._modelingModules);
    }
    
}