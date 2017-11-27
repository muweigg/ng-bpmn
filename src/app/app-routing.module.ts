import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './components';

export const appRoutingComponents = [
    PageNotFoundComponent
]

export var routes: Routes = [
    { path: '', redirectTo: 'bpmn', pathMatch: 'full' },
    { path: 'bpmn', loadChildren: './modules/bpmn/bpmn.module#BpmnModule' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }