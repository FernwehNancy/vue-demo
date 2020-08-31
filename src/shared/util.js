
export const emptyObject = Object.freeze({}); //空的对象，并且不能被改变

//判断是否是undefined或者null
export function inUndef(v){
    return v===undefined || v===null
}

export function isDef(v){
    return v!==undefined && v!==null
}

export function isTrue(v){
    return v===true
}

export function isFalse(v){
    return v===false
}

//判断是否是原始类型
export function isPrimitive(value){
    return (
        typeof value==='string' ||
        typeof value==='number' ||
        typeof value==='symbol' ||
        typeof value==='boolean'
    )
}

export function isObject(obj){
    return obj!==null && typeof obj==='object'
}

const _toString = Object.prototype.toString

//toRawType有啥作用
export function toRawType(val){
    return _toString.call(val).slice(8,-1)
}

//是否纯粹为对象
export function isPlainObject(obj){
    return _toString.call(obj) === '[object Object]'
}

export function isRegExep(v){
    return _toString.call(v)==='[object RegExp]'
}

export function isValidArrayIndex (val) {
    const n = parseFloat(String(val))
    return n >= 0 && Math.floor(n) === n && isFinite(val)
}

export function isPromise(val){
    return (
        isDef(val) &&
        typeof val.then==='function' &&
        typeof val.catch==='function'
    )
}

export function toString(val){
    return val==null ? '' :
    Array.isArray(val) || (isPlainObject(val) && val.toString===_toString)
    ? JSON.stringify(val,null,2)
    : String(val)
}

export function toNumber(val){
    const n = parseFloat(val)
    return isNaN(n) ? val : n
}

export function makeMap(str,expectsLowerCase){
    const map = Object.create(null)
    const list = str.split(',')
    for(let i=0;i<list.length;i++){
        map[list[i]] = true
    }
    return expectsLowerCase ? val=>map[val.toLowerCase()]
    : val=>map[val]
}

export const isBuildInTag = makeMap('slot,component',true)

export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(obj,key){
    return hasOwnProperty.call(obj,key);
}