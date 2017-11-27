import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule, appRoutingComponents } from './app-routing.module';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { metaReducers, SetState, StoreType } from './reducers';
import { take } from 'rxjs/operators/take';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/404/page-not-found.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        StoreModule.forRoot({
            // Add your reducers here
            
        }, { metaReducers })
    ],
    declarations: [
        appRoutingComponents,
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, private _store: Store<any>) { }
    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        console.log('HMR store', JSON.stringify(store, null, 2));

        if (store.state) {
            this._store.dispatch(new SetState(store.state));
        }

        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        this._store.pipe( take(1) ).subscribe(s => store.state = s);
        store.disposeOldHosts = createNewHosts(cmpLocation);
        store.restoreInputValues = createInputTransfer();
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
