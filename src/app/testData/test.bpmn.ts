export default `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>SequenceFlow_0fj0zrc</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:exclusiveGateway id="ExclusiveGateway_1kbxls2">
      <bpmn:incoming>SequenceFlow_0fj0zrc</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_12fpb60</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_15fvdzv</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="SequenceFlow_0fj0zrc" sourceRef="StartEvent_1" targetRef="ExclusiveGateway_1kbxls2" />
    <bpmn:task id="Task_14cfgdp" name="普通任务">
      <bpmn:incoming>SequenceFlow_15fvdzv</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0sofw42</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_12fpb60" sourceRef="ExclusiveGateway_1kbxls2" targetRef="Task_0n9lj4c" />
    <bpmn:subProcess id="Task_0n9lj4c" name="子处理">
      <bpmn:incoming>SequenceFlow_12fpb60</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1mhsqln</bpmn:outgoing>
      <bpmn:startEvent id="StartEvent_1u8b44m">
        <bpmn:outgoing>SequenceFlow_1h009ou</bpmn:outgoing>
      </bpmn:startEvent>
      <bpmn:sequenceFlow id="SequenceFlow_1h009ou" sourceRef="StartEvent_1u8b44m" targetRef="ExclusiveGateway_0trgzvx" />
      <bpmn:parallelGateway id="ExclusiveGateway_0trgzvx">
        <bpmn:incoming>SequenceFlow_1h009ou</bpmn:incoming>
        <bpmn:outgoing>SequenceFlow_1aiq316</bpmn:outgoing>
        <bpmn:outgoing>SequenceFlow_0u6lugv</bpmn:outgoing>
      </bpmn:parallelGateway>
      <bpmn:task id="Task_0s46biu" name="并行任务1">
        <bpmn:incoming>SequenceFlow_1aiq316</bpmn:incoming>
        <bpmn:outgoing>SequenceFlow_0ic3ux8</bpmn:outgoing>
      </bpmn:task>
      <bpmn:sequenceFlow id="SequenceFlow_1aiq316" sourceRef="ExclusiveGateway_0trgzvx" targetRef="Task_0s46biu" />
      <bpmn:task id="Task_07qxgpe" name="并行任务2">
        <bpmn:incoming>SequenceFlow_0u6lugv</bpmn:incoming>
        <bpmn:outgoing>SequenceFlow_1pe88h4</bpmn:outgoing>
      </bpmn:task>
      <bpmn:sequenceFlow id="SequenceFlow_0u6lugv" sourceRef="ExclusiveGateway_0trgzvx" targetRef="Task_07qxgpe" />
      <bpmn:endEvent id="EndEvent_0e2gsct">
        <bpmn:incoming>SequenceFlow_1mpcxsh</bpmn:incoming>
      </bpmn:endEvent>
      <bpmn:sequenceFlow id="SequenceFlow_1pe88h4" sourceRef="Task_07qxgpe" targetRef="ExclusiveGateway_1wijtyo" />
      <bpmn:sequenceFlow id="SequenceFlow_0ic3ux8" sourceRef="Task_0s46biu" targetRef="ExclusiveGateway_1wijtyo" />
      <bpmn:parallelGateway id="ExclusiveGateway_1wijtyo">
        <bpmn:incoming>SequenceFlow_0ic3ux8</bpmn:incoming>
        <bpmn:incoming>SequenceFlow_1pe88h4</bpmn:incoming>
        <bpmn:outgoing>SequenceFlow_1mpcxsh</bpmn:outgoing>
      </bpmn:parallelGateway>
      <bpmn:sequenceFlow id="SequenceFlow_1mpcxsh" sourceRef="ExclusiveGateway_1wijtyo" targetRef="EndEvent_0e2gsct" />
    </bpmn:subProcess>
    <bpmn:endEvent id="EndEvent_1r1ytw6">
      <bpmn:incoming>SequenceFlow_0sofw42</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_1mhsqln</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_0sofw42" sourceRef="Task_14cfgdp" targetRef="EndEvent_1r1ytw6" />
    <bpmn:sequenceFlow id="SequenceFlow_1mhsqln" sourceRef="Task_0n9lj4c" targetRef="EndEvent_1r1ytw6" />
    <bpmn:sequenceFlow id="SequenceFlow_15fvdzv" sourceRef="ExclusiveGateway_1kbxls2" targetRef="Task_14cfgdp" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ExclusiveGateway_1kbxls2_di" bpmnElement="ExclusiveGateway_1kbxls2" isMarkerVisible="true">
        <dc:Bounds x="270" y="95" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="295" y="149" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0fj0zrc_di" bpmnElement="SequenceFlow_0fj0zrc">
        <di:waypoint xsi:type="dc:Point" x="209" y="120" />
        <di:waypoint xsi:type="dc:Point" x="270" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="239.5" y="99" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_14cfgdp_di" bpmnElement="Task_14cfgdp">
        <dc:Bounds x="384" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_12fpb60_di" bpmnElement="SequenceFlow_12fpb60">
        <di:waypoint xsi:type="dc:Point" x="295" y="145" />
        <di:waypoint xsi:type="dc:Point" x="295" y="390" />
        <di:waypoint xsi:type="dc:Point" x="390" y="390" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="265" y="261.5" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="SubProcess_1khbfb4_di" bpmnElement="Task_0n9lj4c" isExpanded="true">
        <dc:Bounds x="390" y="228" width="585" height="323" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1r1ytw6_di" bpmnElement="EndEvent_1r1ytw6">
        <dc:Bounds x="1082" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1055" y="142" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0sofw42_di" bpmnElement="SequenceFlow_0sofw42">
        <di:waypoint xsi:type="dc:Point" x="484" y="120" />
        <di:waypoint xsi:type="dc:Point" x="1082" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="738" y="99" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1mhsqln_di" bpmnElement="SequenceFlow_1mhsqln">
        <di:waypoint xsi:type="dc:Point" x="975" y="390" />
        <di:waypoint xsi:type="dc:Point" x="1041" y="390" />
        <di:waypoint xsi:type="dc:Point" x="1041" y="120" />
        <di:waypoint xsi:type="dc:Point" x="1082" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1011" y="249" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="StartEvent_1u8b44m_di" bpmnElement="StartEvent_1u8b44m">
        <dc:Bounds x="419" y="376" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="392" y="416" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1h009ou_di" bpmnElement="SequenceFlow_1h009ou">
        <di:waypoint xsi:type="dc:Point" x="455" y="394" />
        <di:waypoint xsi:type="dc:Point" x="502" y="394" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="433.5" y="373" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ParallelGateway_1hdbtdk_di" bpmnElement="ExclusiveGateway_0trgzvx">
        <dc:Bounds x="502" y="369" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="482" y="423" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_0s46biu_di" bpmnElement="Task_0s46biu">
        <dc:Bounds x="633" y="281" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1aiq316_di" bpmnElement="SequenceFlow_1aiq316">
        <di:waypoint xsi:type="dc:Point" x="527" y="369" />
        <di:waypoint xsi:type="dc:Point" x="527" y="321" />
        <di:waypoint xsi:type="dc:Point" x="633" y="321" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="497" y="339" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_07qxgpe_di" bpmnElement="Task_07qxgpe">
        <dc:Bounds x="633" y="435" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0u6lugv_di" bpmnElement="SequenceFlow_0u6lugv">
        <di:waypoint xsi:type="dc:Point" x="527" y="419" />
        <di:waypoint xsi:type="dc:Point" x="527" y="475" />
        <di:waypoint xsi:type="dc:Point" x="633" y="475" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="497" y="441" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_0e2gsct_di" bpmnElement="EndEvent_0e2gsct">
        <dc:Bounds x="906" y="376" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="879" y="416" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1pe88h4_di" bpmnElement="SequenceFlow_1pe88h4">
        <di:waypoint xsi:type="dc:Point" x="733" y="475" />
        <di:waypoint xsi:type="dc:Point" x="839" y="475" />
        <di:waypoint xsi:type="dc:Point" x="839" y="419" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="741" y="454" width="90" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_15fvdzv_di" bpmnElement="SequenceFlow_15fvdzv">
        <di:waypoint xsi:type="dc:Point" x="320" y="120" />
        <di:waypoint xsi:type="dc:Point" x="384" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="352" y="99" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0ic3ux8_di" bpmnElement="SequenceFlow_0ic3ux8">
        <di:waypoint xsi:type="dc:Point" x="733" y="321" />
        <di:waypoint xsi:type="dc:Point" x="839" y="321" />
        <di:waypoint xsi:type="dc:Point" x="839" y="369" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="786" y="299.5" width="0" height="13" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ParallelGateway_0yejmzq_di" bpmnElement="ExclusiveGateway_1wijtyo">
        <dc:Bounds x="814" y="369" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="839" y="422" width="0" height="13" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1mpcxsh_di" bpmnElement="SequenceFlow_1mpcxsh">
        <di:waypoint xsi:type="dc:Point" x="864" y="394" />
        <di:waypoint xsi:type="dc:Point" x="906" y="394" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="885" y="372.5" width="0" height="13" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;