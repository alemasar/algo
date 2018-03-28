import CatBootstrap from './common/CatBootstrap';
import Header from './Header/Header';
import Utils from './common/utils';

const bc = new Proxy(new CatBootstrap(new Header()), {
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
    console.log(e)
    console.log(bc.module.constructor.name)

    if (bc.DOMReady && bc.templateReady && e.detail.type === bc.module.constructor.name) {
        console.log("Header cat-draw-page")
        const id = {...bc.module}.id;

        const m = document.body.querySelectorAll("[data-cat-id='" + id + "']");
        const modules = Array.from(m);

        modules.forEach((DOMObj) => {
          //  const id = DOMObj.getAttribute('data-cat-id');
            const type = DOMObj.getAttribute('data-cat-type');
            const template = bc.module.page.getTemplate();
//            const module = bc.module;

            const instance = new Proxy({
                DOMObj,
                template
            }, bc.getInstanceProxy());
            instance.writeTemplate()

        });
    }
});

const templateReadyRef = (e) => {
    console.log(e.detail)
    console.log("entro en cat template ready header")
    console.log(bc.prova)
   // bc.DOMReady = true;
    //if (bc.DOMReady && bc.templateReady) {
        bc.event.triggerEvent("cat-draw-page", {detail: e.detail});
       // document.removeEventListener("cat-template-ready-header", templateReadyRef, false);
    //}
}
document.addEventListener("cat-template-ready", templateReadyRef);


const loadedRef = () => {
    bc.prova = 'header';
    bc.DOMReady = true;
    Utils.triggerEvent("cat-template-ready", {});
    document.removeEventListener("DOMContentLoaded", loadedRef, false)
}

document.addEventListener("DOMContentLoaded", loadedRef)

