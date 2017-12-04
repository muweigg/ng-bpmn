import { Injectable } from "@angular/core";

const BpmnViewer = require('bpmn-js/lib/Viewer');
const BpmnModeler = require('bpmn-js/lib/Modeler');
const BpmnNavigatedViewer = require('bpmn-js/lib/NavigatedViewer');
const MinimapModule = require('diagram-js-minimap');
const TranslateModule = {
    translate: [ 'value', require('../i18n/translate/tml-translate') ]
};
const PaletteProviderModule = {
    paletteProvider: [ 'type', require('../palette/tml-palette-provider') ]
};
const TokenSimulationModule = require('bpmn-js-token-simulation/lib/viewer');
const ReplaceMenuProviderModule = {};

@Injectable()
export class BpmnService {

    constructor () {}

    getViewerInstance (options) {
        return new BpmnViewer(options);
    }
    
    getModelerInstance (options) {
        return new BpmnModeler(options);
    }
    
    getNavigatedViewerInstance (options) {
        return new BpmnNavigatedViewer(options);
    }

    getTokenSimulationModule () {
        return TokenSimulationModule;
    }

    getMinimapModule () {
        return MinimapModule;
    }

    getTranslateModule () {
        return TranslateModule;
    }
    
    getPaletteProviderModule () {
        return PaletteProviderModule;
    }
    
    getReplaceMenuProviderModule () {
        return ReplaceMenuProviderModule;
    }
}