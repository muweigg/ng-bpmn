import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import pizzaXML from '../testData/pizza-collaboration.bpmn';
import testXML from '../testData/test.bpmn';
import { BpmnComponent } from '../modules/bpmn/bpmn.component';

@Component({
    selector: 'page-viewer',
    templateUrl: './page.viewer.component.html',
    styleUrls: ['./page.viewer.component.scss']
})

export class PageViewerComponent implements OnInit {

    @ViewChild('bpmnViewer') bpmnViewer: BpmnComponent;

    xml: string = '';
    businessObject: any;

    constructor() { }

    ngOnInit() { }

    loadTestXML () {
        this.xml = testXML;
    }
    
    newDiagram () {
        this.bpmnViewer.newDiagram();
    }

    exportXML () {
        console.log(this.bpmnViewer.exportXML());
    }

    exportJSON () {
        console.log(this.bpmnViewer.exportJSON());
    }

    openPanel (businessObject) {
        this.businessObject = businessObject;
    }
}