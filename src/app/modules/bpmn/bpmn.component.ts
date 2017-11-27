import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BpmnService } from '../../services/bpmn.service';

import initialXML from './resource/initial.bpmn';
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

    ngAfterViewInit() {
        let BpmnViewer = this.bpmnService.getViewer();
        let BpmnModeler = this.bpmnService.getModeler();
        let minimapModule = this.bpmnService.getMinimap();
        // this.viewer = new BpmnViewer({ container: '#canvas' });
        this.viewer = new BpmnModeler({
            container: '#canvas',
            additionalModules: [
                minimapModule
            ]
        });
        this.viewer.importXML(initialXML, err => {
            if (err) {
                console.log('error rendering', err);
            } else {
                console.log('rendered');
            }
        });
    }
    
}