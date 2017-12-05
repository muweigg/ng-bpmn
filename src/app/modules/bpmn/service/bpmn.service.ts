import { Injectable } from "@angular/core";
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';

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

const tmlOptions = require('../resource/tml-options.json');

@Injectable()
export class BpmnService {

    default: any = {
        additionalModules: [
            MinimapModule,
            TranslateModule,
        ],
        moddleExtensions: {
            tml: tmlOptions
        }
    };

    constructor () {}

    customizerMerge (objValue, srcValue) {
        if (isArray(objValue))
            return objValue.concat(srcValue);
    }

    getViewerInstance (options: any, tokenSimulation: boolean = false) {
        options = mergeWith({}, this.default, options, this.customizerMerge);
        if (tokenSimulation) options.additionalModules.push(TokenSimulationModule);
        return new BpmnViewer(options);
    }
    
    getNavigatedViewerInstance (options: any, tokenSimulation: boolean = false) {
        options = mergeWith({}, this.default, options, this.customizerMerge);
        if (tokenSimulation) options.additionalModules.push(TokenSimulationModule);
        return new BpmnNavigatedViewer(options);
    }
    
    getModelerInstance (options: any, tokenSimulation: boolean = false) {
        options = mergeWith({}, this.default, options, this.customizerMerge);
        if (tokenSimulation) options.additionalModules.push(TokenSimulationModule);
        return new BpmnModeler(options);
    }

    getPaletteProviderModule () {
        return PaletteProviderModule;
    }
}