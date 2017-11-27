import { Injectable } from "@angular/core";

const BpmnViewer = require('bpmn-js');
const BpmnModeler = require('bpmn-js/lib/Modeler');
const MinimapModule = require('diagram-js-minimap');

@Injectable()
export class BpmnService {

    constructor () {}

    getViewer () {
        return BpmnViewer;
    }
    
    getModeler () {
        return BpmnModeler;
    }

    getMinimap () {
        return MinimapModule;
    }
}