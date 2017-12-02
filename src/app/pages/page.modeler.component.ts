import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import pizzaXML from '../testData/pizza-collaboration.bpmn';
import testXML from '../testData/test.bpmn';
import { BpmnComponent } from '../modules/bpmn/bpmn.component';

@Component({
    selector: 'page-modeler',
    templateUrl: './page.modeler.component.html',
    styleUrls: ['./page.modeler.component.scss']
})

export class PageModelerComponent implements OnInit {

    @ViewChild('bpmnModeler') bpmnModeler: BpmnComponent;

    xml: string = '';
    bpmnObject: any;

    constructor() { }

    ngOnInit() { }

    loadTestXML () {
        this.xml = testXML;
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
    
    openPanel (bpmnObject) {
        this.bpmnObject = bpmnObject;
        console.log(this.bpmnObject);
    }
}