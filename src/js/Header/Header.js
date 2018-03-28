import CatLoadTemplate from '../common/CatLoadTemplate';
import Config from './config';
import ConfigMethods from './config-methods';
import TemplateMethods from './template/template-methods';


/*{
    set: (target, property, value) => {
        console.log("Estoy en set pageCreate")
        overrides[property] = value

        return true;
    },

    get: (target, property, receiver) => {
        console.log("Estoy en get pageCreate")
        const prototype = [overrides].
            concat(protos).
            find((proto) => property in proto);
        console.log(property)
        if (prototype) {
            if (property === "get") {
                return () => {
                    return prototype.get("Page");
                }
            }

            return prototype[property];
        }

        return false;
    }
}*/
const protos = new Map();
const config = new Map();

protos.set('template', new TemplateMethods());
protos.set('config', new ConfigMethods());
config.set('template', new Config());
protos.set('load', new CatLoadTemplate());

export default class Header {
    constructor () {
        this.page = new Proxy(protos, this.getProxy());
    }

    getProxy () {
        const overrides = {};

        return {
            get: (target, propKey, receiver) => {
                const keys = Array.from(protos.keys());
                let searchedProto = {}
                keys.forEach((key) => {
                    const prototype = [overrides].
                        concat(protos.get(key)).
                        find((proto) => propKey in proto);

                    if (prototype) {
                        searchedProto = prototype;
                    }
                }, this)

                if (searchedProto) {
                    const ref = (obj, params) => {
                        let param = {config}
                        if (obj) {
                            param.obj = {...obj}
                        }
                        if (params) {
                            param.params = params
                        }
                        return Reflect.apply(
                            searchedProto[propKey],
                            this,
                            [
                                new Proxy(searchedProto, this.getProxyThis()),
                                {...param}
                            ]
                        );
                    }

                    return ref;
                }

                return false;
            }
        }
    }

    getProxyThis () {
        const overrides = {};

        return {
            get: (target, propKey, receiver) => {
                const keys = Array.from(protos.keys());
                if (protos.has(propKey)) {

                    return new Proxy(protos.get(propKey), this.getProxy());
                }


                return false;
            }
        }
    }
}
