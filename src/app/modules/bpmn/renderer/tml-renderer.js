
var inherits = require('inherits');

var BaseRenderer = require('diagram-js/lib/draw/BaseRenderer');
var BpmnRenderer = require('bpmn-js/lib/draw/BpmnRenderer');

var is = require('bpmn-js/lib/util/ModelUtil').is;

var svgAppend = require('tiny-svg/lib/append'),
    svgAttr = require('tiny-svg/lib/attr'),
    svgCreate = require('tiny-svg/lib/create');

// function StartEventRender(eventBus, styles) {
    // BaseRenderer.call(this, eventBus, 1500);
function StartEventRender(eventBus, styles, pathMap, canvas, priority) {
    BpmnRenderer.call(this, eventBus, styles, pathMap, canvas, priority || 1200);

    function startEvent (bpmnShape) {
        svgAttr(bpmnShape, 'stroke', '#9bd040');
    }

    function endEvent (bpmnShape) {
        svgAttr(bpmnShape, 'stroke', '#f44336');
    }

    function task (bpmnShape) {
        const text = bpmnShape.nextSibling;
        svgAttr(bpmnShape, {
            'fill': '#e5f6ff',
            'stroke': '#c1ddf4'
        });
        if (text) {
            svgAttr(bpmnShape.nextSibling, {
                'fill': '#008cff'
            });
        }
    }

    function subProcess (bpmnShape) {
        const text = bpmnShape.nextSibling;
        svgAttr(bpmnShape, 'stroke', '#c1ddf4');
        if (text) {
            svgAttr(bpmnShape.nextSibling, {
                'fill': '#008cff'
            });
        }
    }

    function gateway (bpmnShape) {
        const text = bpmnShape.nextSibling;
        svgAttr(bpmnShape, 'stroke', '#c1ddf4');
        if (text) {
            svgAttr(bpmnShape.nextSibling, 'fill', '#008cff');
            svgAttr(bpmnShape.nextSibling, 'stroke', '#008cff');
        }

    }

    const colors = {
        'bpmn:StartEvent': startEvent,
        'bpmn:EndEvent': endEvent,
        'bpmn:Task': task,
        'bpmn:UserTask': task,
        'bpmn:SubProcess': subProcess,
        'bpmn:ExclusiveGateway': gateway,
        'bpmn:ParallelGateway': gateway
    }

    this.canRender = function (element) {
        return is(element, 'bpmn:BaseElement');
    };

    this.drawShape = function (parent, shape) {
        console.log('shape: ', shape);
        const bpmnShape = this.drawBpmnShape(parent, shape), func = colors[shape.type];
        console.log('shape: ', bpmnShape);
        if (typeof func === 'function') func(bpmnShape);
        // else colors['default'](bpmnShape);
        return bpmnShape;
    };
}

inherits(StartEventRender, BaseRenderer);

StartEventRender.$inject = [
    'eventBus',
    'styles',
    'pathMap',
    'canvas'
];

StartEventRender.prototype.drawBpmnShape = BpmnRenderer.prototype.drawShape;

module.exports = {
    __init__: [ 'tmlRenderer' ],
    tmlRenderer: [ 'type', StartEventRender ]
};
  
