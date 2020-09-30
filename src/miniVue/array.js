const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(method=>{
    const original = arrayProto[method];
    Object.defineProperty(arrayMethods,method,{
        enumerable: false,
        writable: true,
        configurable: true,
        value:function(...args){
            const ob = this.__ob__;//
            ob.dep.notify();
            return original.apply(this,args)
        }
    })
})