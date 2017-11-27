import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule, homeRoutingComponents } from './home-routing.module';

@NgModule({
    declarations: [
        homeRoutingComponents
    ],
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule,
    ],
    exports: [],
    providers: [],
    bootstrap: []
})
export class HomeModule {}