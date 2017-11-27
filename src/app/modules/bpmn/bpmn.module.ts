import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { BpmnRoutingModule, bpmnRoutingComponents } from './bpmn-routing.module';
import { BpmnService } from '../../services/bpmn.service';

@NgModule({
    declarations: [
        bpmnRoutingComponents
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        BpmnRoutingModule
    ],
    exports: [],
    providers: [ BpmnService ],
})
export class BpmnModule {}
