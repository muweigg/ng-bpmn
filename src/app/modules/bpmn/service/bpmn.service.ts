import { Injectable } from "@angular/core";

const BpmnViewer = require('bpmn-js');
const BpmnModeler = require('bpmn-js/lib/Modeler');
const MinimapModule = require('diagram-js-minimap');
const TranslateModule = {
    translate: [ 'value', require('../i18n/translate/tml-translate') ]
};
const PaletteProviderModule = {
    paletteProvider: [ 'type', require('../palette/tml-palette-provider') ]
};
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