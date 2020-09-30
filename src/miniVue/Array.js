const arrayProto=Array.prototype;
export const arrayMethods=Object.create(arrayProto);

[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(function(method){
    //缓存原始方法
    const original=arrayProto[method];
    Object.defineProperty(arrayMethods,method,{
        value:function mutator(...args){
            const ob=this.__ob__;
            console.log('ob',ob);
            const result=original.apply(this,args);
            let inserted;
            switch(method){
                case 'push':
                case 'unshift':
                    inserted=args;
                    break;
                case 'splice':
                    inserted=args.slice(2);
                    break;
            }
            if(inserted){
                ob.observeArray(inserted);
            }
            ob.dep.notify();
            return result;
            // return oroginal.apply(this,args)
        },
        enumerable:false,
        writable:true,
        configurable:true
    })
})