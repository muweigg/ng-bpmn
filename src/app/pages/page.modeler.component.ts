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

    modeler: boolean = false;
    navigated: boolean = false;
    tokenSimulation: boolean = false;

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

    nodePathHighlighted() {
        let ids = [
            'StartEvent_1',
            'ExclusiveGateway_1kbxls2',
            'StartEvent_1u8b44m',
            'ExclusiveGateway_0trgzvx',
            'Task_0s46biu',
        ];
        this.bpmnModeler.nodePathHighlighted(ids);
    }
    
    destroy () {
        this.bpmnModeler.destroy();
    }
    
    openPanel (businessObject) {
        this.businessObject = businessObject;
    }
    
    settingsPanel (businessObject) {
        console.log('settingsPanel: ', businessObject);
    }

    toggleModeler () {
        this.modeler = !this.modeler;
    }

    toggleNavigated () {
        this.navigated = !this.navigated;
    }
    
    toggleTokenSimulation () {
        this.tokenSimulation = !this.tokenSimulation;
    }
}