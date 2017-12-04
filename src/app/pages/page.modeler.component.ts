import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BpmnComponent } from '../modules/bpmn/bpmn.component';

import testXML from '../testData/test.bpmn';

@Component({
    selector: 'page-modeler',
    templateUrl: './page.modeler.component.html',
    styleUrls: ['./page.modeler.component.scss']
})

export class PageModelerComponent implements OnInit {

    @ViewChild('bpmnModeler') bpmnModeler: BpmnComponent;

    businessObject: any;

    constructor() { }

    ngOnInit() { }

    loadTestXML () {
        this.bpmnModeler.loadXML(testXML);
    }
    
    newDiagram () {
        this.bpmnModeler.newDiagram();
    }

    exportXML () {
        console.log(this.bpmnModeler.exportXML());
    }

    exportJSON () {
        console.log(this.bpmnModeler.exportJSON());
    }
    
    openPanel (businessObject) {
        this.businessObject = businessObject;
    }
}