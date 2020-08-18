import {
    hasOwn
} from '../../shared/util'

export function mergeOptions(parent,child,vm){
    console.log('parent',parent,child,vm);
    if(typeof child === 'function'){
        child = child.options
    }

    // normalizeProps(child,vm)
    const options = {}
    let key
    for(key in parent){
        mergeField(key)
    }
    for(key in child){
        if(!hasOwn(parent,key)){
            mergeField(key)
        }
    }
    function mergeField(key){
        let strats = function(){};
        const strat = strats[key] || defaultStrat
        options[key] = strat(parent[key], child[key], vm, key)
    }
    return options
}

const defaultStrat = function(parentVal,childVal){
    return childVal === undefined ? parentVal : childVal
}
 
// function n