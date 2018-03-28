
export default class Config {
    constructor () {
        this.id = 'prova';
        this.type = 'Page';
        this.url = 'templates/templateHTML.html';
        this.route = '/';
    }
}

/*
document.addEventListener('cat-get-config', (e) => {
    const funcRef = e.detail.action;
    funcRef(config);
});*/

/*const handler = (detail) => {
    detail.then((ev) => {
        console.log(ev)
    })
    event.addEventListener(document, 'cat-init-app', () => {
        console.log("trigger: cat-init-app")
        event.triggerEvent('cat-set-config', {
            'type': 'Page',
            'obj': config
        })
    })

    event.addEventListener(document, 'cat-config-ready', (e) => {
        e.detail.action();
    })
}
console.log('Añado addlistener')
event.addEventListener('cat-can-add-events', {
    get: (Target, prop, receiver)=>{
        console.log(target);
        console.log(prop);
        target.then((ev) => {
            console.log(ev)
            handler()
        })

        return (ev) => {
            console.log(Target)
            handler(new Target((resolve, reject)=>{
                resolve(event)
            }));
        }
    }
})
console.log('Añado triggerevent')
event.triggerEvent('cat-can-add-events', {
    'type': 'Page',
    'obj': config
});*/
