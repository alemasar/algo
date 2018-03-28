import { event } from './CatEvents';
import './CatStore';
import Utils from './utils';


export default class CatBootstrap {
    constructor (module) {
        this.module = new Proxy(module, this.getPageProxy());
        this.modulesReady = false;
        this.configReady = false;
        this.DOMReady = false;
        this.templateReady = false;
        this.event = new Proxy(event, this.getEventProxy());
        this.store = {};
        this.prova = 'Aun nada';
        this.template = new Map();
        this.init();
    }

    init () {
        this.initModule();
        this.initTemplate();
    }

    initModule () {
       /* const eventHandler = (eventClass) => {
            console.log("Init Events class")
            this.event = eventClass;
        }

        Utils.triggerEvent("cat-get-events", {action: eventHandler});*/


        const storeHandler = (storeClass) => {
            this.store = storeClass;
        }

        Utils.triggerEvent("cat-get-store", {action: storeHandler});

        const templateHandler = (event) => {        
            const template = {...event.detail.template};
            const type = {...event.detail.type};
            this.template.set(type, template);
            this.templateReady = true;
            console.log("Lanzo cat-template-ready "+ event.detail.type)
            Utils.triggerEvent("cat-template-ready", {type: event.detail.type});
           // document.removeEventListener("cat-set-template", templateHandler, false);
        }
        console.log(this.module.constructor.name)
        document.addEventListener("cat-set-template", templateHandler);
    }

    initTemplate () {      
        this.module.page.initLoadTemplate();
        this.module.page.loadTemplate();
    }

    getPageProxy () {
        return {
            get: (target, prop, receiver) => {
                return Reflect.get(target, prop);
            }
        }
    }
    
    getEventProxy () {
        return {
            get: (target, prop, receiver) => {
                return target;
            }
        }
    }

    getInstanceProxy () {
        return {
            get: (target, prop, receiver) => {
                const hola = this.module.page[prop];
                const ref = (value) => {
                    return hola(target, value);
                }
                return ref;
            }
        }
    }
}

/*
event.addEventListener(document, 'cat-app-ready', () => {
    console.log('launch: cat-app-ready')
    if (modulesReady && configReady) {
        event.triggerEvent('cat-init-app', {});
    }
});
*/
/*
event.addEventListener(document, 'cat-app-ready', () => {
    if (modulesReady && configReady) {
        event.triggerEvent('cat-init-app', {});
    }
})

const funcModulesReady = () => {
    modulesReady = true;
    event.triggerEvent('cat-app-ready', {});
}

event.triggerEvent('cat-modules-ready', {action: funcModulesReady});

const funcConfigReady = () => {
    configReady = true;
    event.triggerEvent('cat-app-ready', {});
}

event.triggerEvent('cat-config-ready', {action: funcConfigReady});

const ref = (state) => {
    store = state;
}

event.triggerEvent('cat-get-store', {
    'action': ref
})

event.addEventListener(document, "cat-page-draw", () => {
    const id = store.configs.get("Page");
    const m = document.body.querySelectorAll("[data-cat-id='" + id.id + "']");
    const modules = Array.from(m);

    console.log(store.templates)
    modules.forEach((DOMObj) => {
        console.log(DOMObj.getAttribute('data-cat-id'));
        const id = DOMObj.getAttribute('data-cat-id');
        const type = DOMObj.getAttribute('data-cat-type');
        const template = store.templates.get(type);
        const module = store.modules.get(type);
        console.log(store)
        const instance = new Proxy({
            DOMObj,
            template
        }, module.getProxy());
        
        instance.initTemplate();
        instance.changeTemplate("HOla");
        event.triggerEvent("cat-set-instance", {
            instance,
            type,
            id
        });
    });
})

event.addEventListener(document, "cat-page-loading", () => {
    if (DOMReady && templateReady) {
        event.triggerEvent("cat-page-draw", {});
    }
})

event.addEventListener(document, "cat-set-template-page", () => {
    templateReady = true;
    event.triggerEvent("cat-page-loading", {});
})*/
