import CatBootstrap from './common/CatBootstrap';
import Page from './Page/Page';
import Utils from './common/utils';

/** This is a description of the foo function. */
const bc = new Proxy(new CatBootstrap(new Page()), {
    get: (target, prop, receiver) => {
        if (typeof target[prop] !== 'object') {
            return target[prop];
        } else if (prop === 'module') {
            return Reflect.get(target, prop, receiver);
        }

        return Reflect.get(target[prop], prop, receiver);
    }
});

console.log(bc.prova)

bc.event.addEventListener("cat-draw-page", (e) => {
    if (bc.DOMReady && bc.templateReady && e.detail.type === bc.module.constructor.name) {
        const id = {...bc.module}.id;

        const m = document.body.querySelectorAll("[data-cat-id='" + id + "']");
        const modules = Array.from(m);

        modules.forEach((DOMObj) => {
            const type = DOMObj.getAttribute('data-cat-type');
            const template = bc.module.page.getTemplate();

            const instance = new Proxy({
                DOMObj,
                template
            }, bc.getInstanceProxy());
            instance.writeTemplate()

        });
    }
});


const templateReadyRef = (e) => {
    bc.event.triggerEvent("cat-draw-page", {detail: e.detail});
}
document.addEventListener("cat-template-ready", templateReadyRef)

const loadedRef = () => {
    bc.prova = 'page';
    bc.DOMReady = true;
    Utils.triggerEvent("cat-template-ready-page", {});
    document.removeEventListener("DOMContentLoaded", loadedRef, false)
}

document.addEventListener("DOMContentLoaded", loadedRef)
