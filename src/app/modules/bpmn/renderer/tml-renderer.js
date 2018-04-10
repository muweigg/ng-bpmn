
var inherits = require('inherits');
var assign = require('lodash/assign');

var BaseRenderer = require('diagram-js/lib/draw/BaseRenderer');
var BpmnRenderer = require('bpmn-js/lib/draw/BpmnRenderer');
var domQuery = require('min-dom/lib/query');

var is = require('bpmn-js/lib/util/ModelUtil').is,
    isAny = require('bpmn-js/lib/features/modeling/util/ModelingUtil').isAny,
    TextUtil = require('diagram-js/lib/util/Text'),
    Ids = require('ids'),
    RENDERER_IDS = new Ids();

var svgAppend = require('tiny-svg/lib/append'),
    svgAttr = require('tiny-svg/lib/attr'),
    svgCreate = require('tiny-svg/lib/create'),
    svgClasses = require('tiny-svg/lib/classes');

function TMLRenderer(eventBus, styles, pathMap, canvas, priority) {
    BpmnRenderer.call(this, eventBus, styles, pathMap, canvas, priority || 1200);

    var computeStyle = styles.computeStyle;
    var rendererId = RENDERER_IDS.next();
    var markers = {};
    var textUtil = new TextUtil({
        style: {
            fontFamily: 'Arial, sans-serif',
            fontSize: 14
        },
        size: { width: 100 }
    });

    function addMarker(id, options) {
        var attrs = assign({
            fill: 'black',
            strokeWidth: 1,
            strokeLinecap: 'round',
            strokeDasharray: 'none'
        }, options.attrs);

        var ref = options.ref || { x: 0, y: 0 };

        var scale = options.scale || 1;

        // fix for safari / chrome / firefox bug not correctly
        // resetting stroke dash array
        if (attrs.strokeDasharray === 'none') {
            attrs.strokeDasharray = [10000, 1];
        }

        var marker = svgCreate('marker');

        svgAttr(options.element, attrs);

        svgAppend(marker, options.element);

        svgAttr(marker, {
            id: id,
            viewBox: '0 0 20 20',
            refX: ref.x,
            refY: ref.y,
            markerWidth: 20 * scale,
            markerHeight: 20 * scale,
            orient: 'auto'
        });

        var defs = domQuery('defs', canvas._svg);

        if (!defs) {
            defs = svgCreate('defs');

            svgAppend(canvas._svg, defs);
        }

        svgAppend(defs, marker);

        markers[id] = marker;
    }

    function marker(type, fill, stroke) {
        var id = type + '-' + fill + '-' + stroke + '-' + rendererId;

        if (!markers[id]) {
            createMarker(type, fill, stroke);
        }

        return 'url(#' + id + ')';
    }

    function createMarker(type, fill, stroke) {
        var id = type + '-' + fill + '-' + stroke + '-' + rendererId;

        if (type === 'sequenceflow-end') {
            var sequenceflowEnd = svgCreate('path');
            svgAttr(sequenceflowEnd, { d: 'M 1 5 L 11 10 L 1 15 Z' });

            addMarker(id, {
                element: sequenceflowEnd,
                ref: { x: 11, y: 10 },
                scale: 0.5,
                attrs: {
                    fill: stroke,
                    stroke: stroke
                }
            });
        }

        if (type === 'messageflow-start') {
            var messageflowStart = svgCreate('circle');
            svgAttr(messageflowStart, { cx: 6, cy: 6, r: 3.5 });

            addMarker(id, {
                element: messageflowStart,
                attrs: {
                    fill: fill,
                    stroke: stroke
                },
                ref: { x: 6, y: 6 }
            });
        }

        if (type === 'messageflow-end') {
            var messageflowEnd = svgCreate('path');
            svgAttr(messageflowEnd, { d: 'm 1 5 l 0 -3 l 7 3 l -7 3 z' });

            addMarker(id, {
                element: messageflowEnd,
                attrs: {
                    fill: fill,
                    stroke: stroke,
                    strokeLinecap: 'butt'
                },
                ref: { x: 8.5, y: 5 }
            });
        }

        if (type === 'association-start') {
            var associationStart = svgCreate('path');
            svgAttr(associationStart, { d: 'M 11 5 L 1 10 L 11 15' });

            addMarker(id, {
                element: associationStart,
                attrs: {
                    fill: 'none',
                    stroke: stroke,
                    strokeWidth: 1.5
                },
                ref: { x: 1, y: 10 },
                scale: 0.5
            });
        }

        if (type === 'association-end') {
            var associationEnd = svgCreate('path');
            svgAttr(associationEnd, { d: 'M 1 5 L 11 10 L 1 15' });

            addMarker(id, {
                element: associationEnd,
                attrs: {
                    fill: 'none',
                    stroke: stroke,
                    strokeWidth: 1.5
                },
                ref: { x: 12, y: 10 },
                scale: 0.5
            });
        }

        if (type === 'conditional-flow-marker') {
            var conditionalflowMarker = svgCreate('path');
            svgAttr(conditionalflowMarker, { d: 'M 0 10 L 8 6 L 16 10 L 8 14 Z' });

            addMarker(id, {
                element: conditionalflowMarker,
                attrs: {
                    fill: fill,
                    stroke: stroke
                },
                ref: { x: -1, y: 10 },
                scale: 0.5
            });
        }

        if (type === 'conditional-default-flow-marker') {
            var conditionaldefaultflowMarker = svgCreate('path');
            svgAttr(conditionaldefaultflowMarker, { d: 'M 6 4 L 10 16' });

            addMarker(id, {
                element: conditionaldefaultflowMarker,
                attrs: {
                    stroke: stroke
                },
                ref: { x: 0, y: 10 },
                scale: 0.5
            });
        }
    }

    function renderLabel(parentGfx, label, options) {
        var text = textUtil.createText(label || '', options);
        svgClasses(text).add('djs-label');
        svgAppend(parentGfx, text);

        return text;
    }
    
    function renderEmbeddedLabel(parentGfx, element, align) {
        var semantic = element.businessObject;

        return renderLabel(parentGfx, semantic.name, {
            box: element,
            align: align,
            padding: 5,
            style: {
                fill: '#008cff',
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: 'Microsoft YaHei'
            }
        });
    }

    function startEvent(bpmnShape) {
        svgAttr(bpmnShape, 'stroke', '#9bd040');
    }

    function endEvent(bpmnShape) {
        svgAttr(bpmnShape, 'stroke', '#f44336');
    }

    function task(bpmnShape, parentGfx, element) {
        const text = bpmnShape.nextSibling;
        renderEmbeddedLabel(parentGfx, element, 'center-middle');
        svgAttr(bpmnShape, {
            'fill': '#e5f6ff',
            'stroke': '#c1ddf4'
        });
        if (text) parentGfx.removeChild(text);
    }

    function subProcess(bpmnShape, parentGfx, element) {
        const text = bpmnShape.nextSibling;
        renderEmbeddedLabel(parentGfx, element, 'center-top');
        svgAttr(bpmnShape, {'stroke': '#c1ddf4'});
        if (text) parentGfx.removeChild(text);
    }

    function gateway(bpmnShape) {
        const text = bpmnShape.nextSibling;
        svgAttr(bpmnShape, 'stroke', '#c1ddf4');
        if (text) {
            svgAttr(text, {
                'fill': '#008cff',
                'stroke': '#008cff'
            });
        }
    }

    function label(bpmnShape) {
        svgAttr(bpmnShape, {
            'fill': '#008cff',
        });
    }

    function textAnnotation(bpmnShape) {
        const path = bpmnShape.nextSibling;
        const text = path.nextSibling;
        svgAttr(path, {
            'stroke': '#6b7e98',
        });
        svgAttr(text, {
            'fill': '#008cff',
        });
    }

    const colors = {
        'bpmn:StartEvent': startEvent,
        'bpmn:EndEvent': endEvent,
        'bpmn:Task': task,
        'bpmn:UserTask': task,
        'bpmn:ServiceTask': task,
        'bpmn:SubProcess': subProcess,
        'bpmn:ExclusiveGateway': gateway,
        'bpmn:ParallelGateway': gateway,
        'bpmn:TextAnnotation': textAnnotation,
        'label': label,
        'bpmn:SequenceFlow': '#6b7e98',
        'bpmn:Association': '#6b7e98',
    }

    this.canRender = function (element) {
        return is(element, 'bpmn:BaseElement');
    };

    this.drawShape = function (parentGfx, element) {
        const bpmnShape = this.drawBpmnShape(parentGfx, element), func = colors[element.type];
        if (typeof func === 'function') func(bpmnShape, parentGfx, element);
        // else colors['default'](bpmnShape);
        return bpmnShape;
    };

    this.drawConnection = function (parentGfx, element) {
        const bpmnConnectionPath = this.drawBpmnConnection(parentGfx, element);
        const color = colors[element.type];

        const sequenceFlow = element.businessObject;
        const source = element.source.businessObject;

        if (is(element, 'bpmn:Association')) {

            let attrs = {
                stroke: color
            }

            if (sequenceFlow.associationDirection === 'One' ||
                sequenceFlow.associationDirection === 'Both') {
                attrs.markerEnd = marker('association-end', color, color);
            }

            if (sequenceFlow.associationDirection === 'Both') {
                attrs.markerStart = marker('association-start', color, color);
            }

            svgAttr(bpmnConnectionPath, attrs);

            return bpmnConnectionPath;
        }

        svgAttr(bpmnConnectionPath, {
            strokeLinejoin: 'round',
            markerEnd: marker('sequenceflow-end', color, color),
            stroke: color
        })

        // conditional flow marker
        if (sequenceFlow.conditionExpression && source.$instanceOf('bpmn:Activity')) {
            svgAttr(bpmnConnectionPath, {
                markerStart: marker('conditional-flow-marker', '#fff', color)
            });
        }

        // default marker
        if (source.default && (source.$instanceOf('bpmn:Gateway') || source.$instanceOf('bpmn:Activity')) &&
            source.default === sequenceFlow) {
            svgAttr(bpmnConnectionPath, {
                markerStart: marker('conditional-default-flow-marker', '#fff', color)
            });
        }

        return bpmnConnectionPath;
    }
}

inherits(TMLRenderer, BaseRenderer);

TMLRenderer.$inject = [
    'eventBus',
    'styles',
    'pathMap',
    'canvas'
];

TMLRenderer.prototype.drawBpmnShape = BpmnRenderer.prototype.drawShape;
TMLRenderer.prototype.drawBpmnConnection = BpmnRenderer.prototype.drawConnection;

module.exports = {
    __init__: ['tmlRenderer'],
    tmlRenderer: ['type', TMLRenderer]
};

