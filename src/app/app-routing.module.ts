import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './components';
import { PageModelerComponent } from './pages/page.modeler.component';
import { DocComponent } from './pages/doc.component';

export const appRoutingComponents = [
    PageModelerComponent,
    DocComponent,
    PageNotFoundComponent
]

export var routes: Routes = [
    { path: '', redirectTo: 'modeler', pathMatch: 'full' },
    { path: 'modeler', component: PageModelerComponent },
    { path: 'doc', component: DocComponent },
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