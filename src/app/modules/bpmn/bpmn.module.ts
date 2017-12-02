import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BpmnService } from './service/bpmn.service';
import { BpmnComponent } from './bpmn.component';

@NgModule({
    declarations: [
        BpmnComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    exports: [ HttpClientModule, BpmnComponent ],
    entryComponents: [ BpmnComponent ],
    providers: [ BpmnService ],
})
export class BpmnModule {}
