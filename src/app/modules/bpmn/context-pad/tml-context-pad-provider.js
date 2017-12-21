'use strict';

import { onSettings } from '../bpmn.component';

const assign = require('lodash/assign'),
    isArray = require('lodash/isArray'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    isAny = require('bpmn-js/lib/features/modeling/util/ModelingUtil').isAny;

function TMLContextPadProvider(contextPad, modeling, translate, rules, canvas, popupMenu) {

    this._contextPad = contextPad;
    this._modeling = modeling;
    this._translate = translate;
    this._rules = rules;
    this._canvas = canvas;
    this._popupMenu = popupMenu;

    contextPad.registerProvider(this);
}

TMLContextPadProvider.$inject = [
    'contextPad',
    'modeling',
    'translate',
    'rules',
    'canvas',
    'popupMenu',
];

export default {
    __depends__: [
        require('diagram-js/lib/features/context-pad'),
        require('bpmn-js/lib/features/popup-menu'),
        require('bpmn-js/lib/features/modeling'),
    ],
    __init__: ['tmlContextPadProvider'],
    tmlContextPadProvider: ['type', TMLContextPadProvider]
}

TMLContextPadProvider.prototype.getContextPadEntries = function (element) {
    const self = this,
        modeling = this._modeling,
        translate = this._translate,
        rules = this._rules;

    const nameIdx = {
        'bpmn:StartEvent': translate('Start Event'),
        'bpmn:EndEvent': translate('End Event'),
        'bpmn:ExclusiveGateway': translate('Exclusive Gateway'),
        'bpmn:ParallelGateway': translate('Parallel Gateway'),
        'bpmn:Task': translate('Task'),
        'bpmn:SubProcess': translate('Sub Process'),
    }

    var businessObject = element.businessObject;

    var actions = {};

    function removeElement(e) {
        modeling.removeElements([ element ]);
    }

    if (isAny(businessObject, ['bpmn:FlowNode'])) {
        assign(actions, {
            'settings-options': {
                group: 'edit',
                className: 'bpmn-icon-settings',
                title: translate('Settings Options'),
                action: {
                    click: function (event, element) {
                        self._popupMenu.close();
                        onSettings.emit(element.businessObject);
                    }
                }
            }
        });
    }

    var deleteAllowed = rules.allowed('elements.delete', { elements: [ element ] });

    if (isArray(deleteAllowed)) {
        deleteAllowed = deleteAllowed[0] === element;
    }

    if (deleteAllowed && isAny(businessObject, ['bpmn:FlowNode'])) {
        assign(actions, {
            'delete': {
                group: 'edit',
                className: 'bpmn-icon-trash',
                title: translate('Remove'),
                action: {
                    click: (e) => {
                        let name = businessObject.name ? businessObject.name : nameIdx[businessObject.$type];
                        let isAllowed = window.confirm(`确认移除 "${name}" ？`);
                        if (isAllowed) removeElement(e);
                    },
                    dragstart: removeElement
                }
            }
        });
    }

    return actions;
};
