import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './components';
import { PageViewerComponent } from './pages/page.viewer.component';
import { PageModelerComponent } from './pages/page.modeler.component';

export const appRoutingComponents = [
    PageViewerComponent,
    PageModelerComponent,
    PageNotFoundComponent
]

export var routes: Routes = [
    { path: '', redirectTo: 'modeler', pathMatch: 'full' },
    { path: 'viewer', component: PageViewerComponent },
    { path: 'modeler', component: PageModelerComponent },
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