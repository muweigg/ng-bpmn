export default `
    <?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
    <bpmn:process id="Process_1" isExecutable="false">
        <bpmn:startEvent id="StartEvent_1">
        <bpmn:outgoing>SequenceFlow_04k3sxo</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:sequenceFlow id="SequenceFlow_04k3sxo" sourceRef="StartEvent_1" targetRef="Task_1mjhxke" />
        <bpmn:subProcess id="Task_1mjhxke">
        <bpmn:incoming>SequenceFlow_04k3sxo</bpmn:incoming>
        <bpmn:startEvent id="StartEvent_1e8kdgd">
            <bpmn:outgoing>SequenceFlow_0k4g6iv</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:sequenceFlow id="SequenceFlow_0k4g6iv" sourceRef="StartEvent_1e8kdgd" targetRef="ExclusiveGateway_1skg98n" />
        <bpmn:parallelGateway id="ExclusiveGateway_1skg98n">
            <bpmn:incoming>SequenceFlow_0k4g6iv</bpmn:incoming>
            <bpmn:outgoing>SequenceFlow_1u3hm2n</bpmn:outgoing>
            <bpmn:outgoing>SequenceFlow_1fpze16</bpmn:outgoing>
            <bpmn:outgoing>SequenceFlow_0lxy5zf</bpmn:outgoing>
        </bpmn:parallelGateway>
        <bpmn:task id="Task_0xwivvn">
            <bpmn:incoming>SequenceFlow_1u3hm2n</bpmn:incoming>
        </bpmn:task>
        <bpmn:sequenceFlow id="SequenceFlow_1u3hm2n" sourceRef="ExclusiveGateway_1skg98n" targetRef="Task_0xwivvn" />
        <bpmn:task id="Task_0eqppdl">
            <bpmn:incoming>SequenceFlow_1fpze16</bpmn:incoming>
        </bpmn:task>
        <bpmn:sequenceFlow id="SequenceFlow_1fpze16" sourceRef="ExclusiveGateway_1skg98n" targetRef="Task_0eqppdl" />
        <bpmn:task id="Task_006t3dt">
            <bpmn:incoming>SequenceFlow_0lxy5zf</bpmn:incoming>
        </bpmn:task>
        <bpmn:sequenceFlow id="SequenceFlow_0lxy5zf" sourceRef="ExclusiveGateway_1skg98n" targetRef="Task_006t3dt" />
        </bpmn:subProcess>
    </bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
        <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
            <dc:Bounds x="173" y="102" width="36" height="36" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge id="SequenceFlow_04k3sxo_di" bpmnElement="SequenceFlow_04k3sxo">
            <di:waypoint xsi:type="dc:Point" x="209" y="120" />
            <di:waypoint xsi:type="dc:Point" x="390" y="118" />
            <bpmndi:BPMNLabel>
            <dc:Bounds x="254.5" y="98" width="90" height="12" />
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNShape id="SubProcess_1wj905j_di" bpmnElement="Task_1mjhxke" isExpanded="false">
            <dc:Bounds x="390" y="77.5" width="100" height="80" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="StartEvent_1e8kdgd_di" bpmnElement="StartEvent_1e8kdgd">
            <dc:Bounds x="300" y="92" width="36" height="36" />
            <bpmndi:BPMNLabel>
            <dc:Bounds x="273" y="132" width="90" height="12" />
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge id="SequenceFlow_0k4g6iv_di" bpmnElement="SequenceFlow_0k4g6iv">
            <di:waypoint xsi:type="dc:Point" x="336" y="110" />
            <di:waypoint xsi:type="dc:Point" x="367" y="110" />
            <bpmndi:BPMNLabel>
            <dc:Bounds x="307" y="89" width="90" height="12" />
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNShape id="ParallelGateway_13daz67_di" bpmnElement="ExclusiveGateway_1skg98n">
            <dc:Bounds x="367" y="85" width="50" height="50" />
            <bpmndi:BPMNLabel>
            <dc:Bounds x="347" y="139" width="90" height="12" />
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Task_0xwivvn_di" bpmnElement="Task_0xwivvn">
            <dc:Bounds x="480" y="-55" width="100" height="80" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge id="SequenceFlow_1u3hm2n_di" bpmnElement="SequenceFlow_1u3hm2n">
            <di:waypoint xsi:type="dc:Point" x="392" y="85" />
            <di:waypoint xsi:type="dc:Point" x="392" y="-15" />
            <di:waypoint xsi:type="dc:Point" x="480" y="-15" />
            <bpmndi:BPMNLabel>
            <dc:Bounds x="362" y="29" width="90" height="12" />
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNShape id="Task_0eqppdl_di" bpmnElement="Task_0eqppdl">
            <dc:Bounds x="480" y="70" width="100" height="80" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge id="SequenceFlow_1fpze16_di" bpmnElement="SequenceFlow_1fpze16">
            <di:waypoint xsi:type="dc:Point" x="417" y="110" />
            <di:waypoint xsi:type="dc:Point" x="480" y="110" />
            <bpmndi:BPMNLabel>
            <dc:Bounds x="404" y="89" width="90" height="12" />
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNShape id="Task_006t3dt_di" bpmnElement="Task_006t3dt">
            <dc:Bounds x="480" y="210" width="100" height="80" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge id="SequenceFlow_0lxy5zf_di" bpmnElement="SequenceFlow_0lxy5zf">
            <di:waypoint xsi:type="dc:Point" x="392" y="135" />
            <di:waypoint xsi:type="dc:Point" x="392" y="250" />
            <di:waypoint xsi:type="dc:Point" x="480" y="250" />
            <bpmndi:BPMNLabel>
            <dc:Bounds x="362" y="187" width="90" height="12" />
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
    </bpmn:definitions>
`;