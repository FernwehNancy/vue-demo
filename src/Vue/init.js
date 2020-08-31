import {mergeOptions} from './util/index';

export function initMixin(Vue){
    Vue.prototype._init = function (options){        
        const vm = this;
        console.log(vm.constructor);
        vm.$options = mergeOptions(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm
        )
        console.log('options',vm.$options);
    }
}

export function resolveConstructorOptions(Ctor){
    let options = Ctor.options;
    // if(Ctor.super){
    //     const superOptions = resolveConstructorOptions(Ctor.super)
    //     const cachedSuperOptions = Ctor.superOptions
    //     if(superOptions !== cachedSuperOptions){
    //         Ctor.superOptions = superOptions 
    //         const modifiedOptions = resolveConstructorOptions(Ctor)
    //         if(modifiedOptions){
    //             extend(Ctor.extendOptions, modifiedOptions)
    //         }
    //         options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
    //         if(options.name){
    //             options.components[options.name] = Ctor
    //         }
    //     }
    // }
    return options
}