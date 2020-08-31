//data数据处理
import{
    isPlainObject
} from '../shared/util';

export function stateMixin(Vue){
    const dataDef = {}
    dataDef.get=function(){return this._data}
    const propsDef = {}
    propsDef.get=function(){return this._props}
    dataDef.set = function(){
        warn(
            'Avoid replacing instance root $data. ' +
            'Use nested data properties instead.',
            this
        )
    }
    propsDef.set=function(){
        warn(`$props is readonly.`,this)
    }
    Object.defineProperty(Vue.prototype,'$data',dataDef)
    Object.defineProperty(Vue.prototype,'$props',propsDef)

    Vue.prototype.$set = set
    Vue.prototype.$delete = del

    Vue.prototype.$watch = function(expOrFn,cb,options){
        const vm = this;
        if(isPlainObject(cb)){
            return createWatcher(vm,expOrFn,cb,options)
        }
    }
}

function createWatcher(vm,expOrFn,handler,options){
    if(isPlainObject(handler)){
        options = handler
        handler = handler.handler
    }
    if(typeof handler ==='string'){
        handler = vm[handler]
    }
    return vm.$watch(expOrFn,handler,options)
}