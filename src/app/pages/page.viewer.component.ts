import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BpmnComponent } from '../modules/bpmn/bpmn.component';

import testXML from '../testData/test.bpmn';

@Component({
    selector: 'page-viewer',
    templateUrl: './page.viewer.component.html',
    styleUrls: ['./page.viewer.component.scss']
})

export class PageViewerComponent implements OnInit {

    @ViewChild('bpmnViewer') bpmnViewer: BpmnComponent;

    businessObject: any;

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.bpmnViewer.loadXML(testXML);
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