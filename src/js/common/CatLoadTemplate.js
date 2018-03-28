import Ajax from './ajax';
import Utils from './utils';

const path = document.currentScript && document.currentScript.src;

export default class CatLoadTemplate {
    initLoadTemplate (thisClass, params) {
        const c = params.config.get("template");
        this.fileName = c.url;
        this.type = c.type;
        this.id = c.id;
        this.template = '';
    }

    loadTemplate () {
        Ajax.loadTemplate().
            load(path, this.fileName).
            then((res) => {
                this.template = res.content;
                console.log(this.type)
                Utils.triggerEvent("cat-set-template", {
                    "type": this.type,
                    "template": res.content
                })
            });
    }

    getTemplate () {
        return this.template;
    }
}


/*
let loadTemplate = new LoadTemplate("", "");

document.addEventListener('cat-get-template', (e) => {
    const funcRef = e.detail.action;
    funcRef(loadTemplate);
});
*/

// event.triggerEvent("cat-can-add-events", {});

/*
document.addEventListener('cat-can-add-events', (e) => {
    const event = e.detail.event;
    event.addEventListener(document, 'cat-load-template', (e) => {
        console.log('cat-load-template')
        const template = {...e.detail};


        loadTemplate(template.template, template.type);
    })
})
*/
