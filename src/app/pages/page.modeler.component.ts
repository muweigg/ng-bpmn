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
    language: any = {
        "Activate the global connect tool": '关联',
        "Activate the hand tool": '拖动',
        "Activate the lasso tool": '多选',
        "Sub Process": '子处理',
        "Sub Process (collapsed)": '子处理 (折叠)',
        "Sub Process (expanded)": '子处理 (展开)',
        "Create expanded SubProcess": '创建子处理 (展开)',
        "Exclusive Gateway": '排他网关',
        "Parallel Gateway": '并行网关',
        "Default Flow": '默认流',
        "Sequence Flow": '顺序流',
        "Conditional Flow": '条件流',
        "Start Event": '开始事件',
        "End Event": '结束事件',
        "Task": '任务',
        "User Task": '审核任务',
        "Text Annotation": "文本注解",
        "Settings Options": "任务配置",
    }

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
            ['ExclusiveGateway_1wijtyo', 'Task_07qxgpe'],
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