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
    allowDownload: boolean = false;
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
            {
                id: 'ExclusiveGateway_1kbxls2',
                color: {
                    task: {
                        'fill': '#d0eba4',
                        'stroke': '#d0eba4',
                    },
                    text: {
                        'fill': '#668431',
                        'stroke': '#668431',
                    }
                }
            },
            {
                id: 'Task_0n9lj4c',
                color: {
                    task: {
                        'stroke': '#ff9800',
                    },
                    text: {
                        'fill': '#ff9800',
                    }
                }
            },
            {
                id: 'ExclusiveGateway_0trgzvx',
                color: {
                    task: {
                        'fill': '#d0eba4',
                        'stroke': '#d0eba4',
                    },
                    text: {
                        'fill': '#668431',
                        'stroke': '#668431',
                    }
                }
            },
            {
                id: 'Task_0s46biu',
                color: {
                    task: {
                        'fill': '#d0eba4',
                        'stroke': '#d0eba4',
                    },
                    text: {
                        'fill': '#668431',
                    }
                }
            },
            {
                id: 'ExclusiveGateway_1wijtyo',
                color: {
                    task: {
                        'fill': '#fff0be',
                        'stroke': '#ff9800',
                    },
                    text: {
                        'fill': '#ff9800',
                        'stroke': '#ff9800',
                    }
                }
            },
            {
                id: 'Task_07qxgpe',
                color: {
                    task: {
                        'fill': '#fff0be',
                        'stroke': '#ff9800',
                    },
                    text: {
                        'fill': '#ff9800',
                    }
                }
            },
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
    
    toggleAllowDownload () {
        this.allowDownload = !this.allowDownload;
    }
}