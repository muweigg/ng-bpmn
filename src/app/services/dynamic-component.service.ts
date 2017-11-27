import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef, EmbeddedViewRef, Type } from '@angular/core';

/**
 * Dynamic component service
 * 
 * @export
 * @class DynamicComponentService
 */
@Injectable()
export class DynamicComponentService {

    constructor(
        private appRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector
    ) { }

    /**
     * Gets the root view container to inject the component to.
     * 
     * @returns {ComponentRef<any>}
     * 
     * @memberOf DynamicComponentService
     */
    getRootViewContainer(): ComponentRef<any> {
        const rootComponents = this.appRef['_rootComponents'];
        if (rootComponents.length) return rootComponents[0];

        throw new Error('View Container not found!');
    }

    /**
     * Gets the root view container reference to inject the component to.
     * 
     * @returns {ComponentRef<any>}
     * 
     * @memberOf DynamicComponentService
     */
    getRootViewContainerRef(): ViewContainerRef {
        const appInstance = this.appRef.components[0].instance;
        const appName = this.appRef.componentTypes[0].name;

        if (appInstance.viewContainerRef) return appInstance.viewContainerRef;

        throw new Error(`Missing 'viewContainerRef' declaration in ${appName} constructor`);
    }

    /**
     * Gets the html element for a component ref.
     * 
     * @param {ComponentRef<any>} componentRef
     * @returns {HTMLElement}
     * 
     * @memberOf DynamicComponentService
     */
    getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    /**
     * Gets the root component container html element.
     * 
     * @returns {HTMLElement}
     * 
     * @memberOf DynamicComponentService
     */
    getRootViewContainerNode(): HTMLElement {
        return this.getComponentRootNode(this.getRootViewContainer());
    }

    /**
     * Projects the inputs onto the component
     * 
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     * 
     * @memberOf DynamicComponentService
     */
    projectComponentInputs(component: ComponentRef<any>, options: any): ComponentRef<any> {
        if (options) {
            const props = Object.getOwnPropertyNames(options);
            for (const prop of props) {
                component.instance[prop] = options[prop];
            }
        }

        return component;
    }

    /**
     * Appends a component to a last location in component
     * 
     * Note: need to be destroyed manually
     * 
     * @template T
     * @param {Type<T>} componentClass
     * @param {*} [options={}]
     * @param {Element} [location=this.getRootViewContainerNode()]
     * @returns {ComponentRef<any>}
     * 
     * @memberOf DynamicComponentService
     */
    appendComponent<T>(
        componentClass: Type<T>,
        options: any = {},
        location: Element | ViewContainerRef = document.body): ComponentRef<any> {

        let componentRef: ComponentRef<any>;
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);

        if (!(location instanceof Element)) {
            componentRef = location.createComponent(componentFactory, location.length, this.injector);
            this.projectComponentInputs(componentRef, options);
            return componentRef;
        }

        componentRef = componentFactory.create(this.injector);

        this.appRef.attachView(componentRef.hostView);

        componentRef.onDestroy(() => {
            this.appRef.detachView(componentRef.hostView);
        });

        this.projectComponentInputs(componentRef, options);

        (location as Element).appendChild(this.getComponentRootNode(componentRef));

        return componentRef;
    }
}