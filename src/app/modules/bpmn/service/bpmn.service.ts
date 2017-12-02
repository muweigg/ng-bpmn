import { Injectable } from "@angular/core";

const BpmnViewer = require('bpmn-js');
const BpmnModeler = require('bpmn-js/lib/Modeler');
const MinimapModule = require('diagram-js-minimap');

@Injectable()
export class BpmnService {

    constructor () {}

    getViewerInstance (options) {
        return new BpmnViewer(options);
    }
    
    getModelerInstance (options) {
        return new BpmnModeler(options);
    }

    getMinimapModule () {
        return MinimapModule;
    }
}