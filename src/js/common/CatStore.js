
export default class CatStore {
    constructor () {
        this.modules = new Map();
        this.templates = new Map();
        this.configs = new Map();
        this.instances = new Map();
        // Utils.triggerEvent('cat-store-ready', {})
    }

    addModel (type, module) {
        const keys = Object.keys(this.modules)

        if (!(type in keys)) {
            this.modules.set(type, module);
        }
    }

    addTemplate (type, template) {
        const keys = Object.keys(this.templates)

        if (!(type in keys)) {
            this.templates.set(type, template);
        }
    }

    addConfig (type, config) {
        const keys = Object.keys(this.configs)

        if (!(type in keys)) {
            this.configs.set(type, config);
        }
    }

/*
    addInstance (type, id, instance) {
        const keys = Object.keys(this.instances)
        if (!(id in keys)) {

            const module = this.modules.get(type);
            const inst = new Map();
            inst.set(type, module);
            this.instances.set(id, inst);
        }
    }
*/

}

export const store = new CatStore();

document.addEventListener('cat-get-store', (e) => {
    const funcRef = e.detail.action;
    funcRef(store);
});

/*
event.addEventListener('cat-set-config', {
    get: (Target, prop, receiver)=>{
        return (ev) => {
            console.log(target[prop]);
            console.log(prop);
            const p = new Target((resolve, reject)=>{
                resolve(ev);
            })

            return p;
        }
    }
});*/
/*
const getStoreHandler = (ev) => {
    console.log("Estoy en get store ")
    console.log(store);
    const func = ev.detail.action;
    console.log(func)
    func(store);
    //  document.removeEventListener('cat-get-modules', ref, false);
}

const refStore = getStoreHandler.bind(store);

document.addEventListener('cat-get-store', refStore);

const setStoreHandler = (ev) => {
    console.log(ev)
    const state = ev.detail.obj;
    console.log(state);
    store = state;
    //  document.removeEventListener('cat-get-modules', ref, false);
}

const refSetStore = setStoreHandler.bind(store);

document.addEventListener('cat-set-store', refSetStore);

*/

/* const setEvents = () => {
        const setModule = () => {
            console.log("entro en set module")
            const module = ev;
            let modules = {};

            const globalSetModule = () => {
                const ref = (state) => {
                    modules = state;
                }

                event.triggerEvent('cat-get-store', {
                    'action': ref
                })
                const model = new module.Obj(modules.configs.get(module.type));
                modules.addModel(module.type, model);

                event.triggerEvent('cat-set-store', {
                    obj: modules
                });
            }
            globalSetModule();

            event.triggerEvent('cat-set-module-' + module.type.toLowerCase(), {
                'module': store.modules.get(module.type)
            });
            //  document.removeEventListener('cat-set-modules', setModule, false);
        }
        event.addEventListener(document, 'cat-set-modules', setModule);

        const setTemplate = () => {
            console.log("entro en set template")
            const template = ev;
            let templates = {};

            const globalSetTemplate = () => {
                const ref = (state) => {
                    templates = state;
                }

                event.triggerEvent('cat-get-store', {
                    'action': ref
                })
                templates.addTemplate(template.type, template);
                event.triggerEvent('cat-set-store', {
                    obj: templates
                });
            }
            globalSetTemplate();
            const type = template.type.toLowerCase();
            event.triggerEvent('cat-set-template-' + type, {
                'template': templates.templates.get(template.type)
            });
            // document

            // .removeEventListener('cat-set-template', setTemplate, false);
        }

        event.addEventListener(document, 'cat-set-template', setTemplate);

        const setInstance = () => {
            console.log("entro en set instance")
            const instance = ev;
            let instances = {};

            const globalSetInstance = () => {
                const ref = (state) => {
                    console.log(state)
                    instances = state;
                }

                event.triggerEvent('cat-get-store', {
                    'action': ref
                })
                console.log(instances)
                instances.addInstance(
                    instance.type,
                    instance.id,
                    instance.instance
                );
                event.triggerEvent('cat-set-store', {
                    obj: instances
                });
            }
            globalSetInstance();
            const type = instance.type.toLowerCase();
            event.triggerEvent('cat-set-instance-' + instance.id + '-' + type, {
                'instance': instances.instances.get(instance.id).get(instance.type)
            });
            // document

            // .removeEventListener('cat-set-template', setTemplate, false);
        }

        event.addEventListener(document, 'cat-set-instance', setInstance);
    }
    setEvents();
    const setConfig = () => {
        console.log("entro en set config")
        const config = ev;
        let configs = {};

        const globalSetModule = () => {
            const ref = (state) => {
                console.log(state)
                configs = state;
            }

            Utils.triggerEvent('cat-get-store', {
                'action': ref
            })
            console.log(configs)
            configs.addConfig(config.type, config.obj);
            Utils.triggerEvent('cat-set-store', {
                obj: configs
            });
        }
        globalSetModule();
        event.triggerEvent('cat-set-config-' + config.type.toLowerCase(), {});
        // document.removeEventListener('cat-set-modules', setModule, false);
    }
    setConfig();*/


// const getEvents = () => {

// }

// getEvents();

/* event.addEventListener(document, 'cat-store-ready', (e) => {
    e.action();
}) */

