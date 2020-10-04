import {arrayMethods} from './Array';

function Vue(options){
    console.log('init vue',options);
    this.$data=options.data;
    this.$options=options;
    new Observer(this.$data);
}


const hasProto = '__proto__' in {};
const arrayKeys=Object.getOwnPropertyNames(arrayMethods);
function defineReactive(data,key,val){//数据劫持
    // if(typeof val==='object'){
    //     new Observer(val);
    // }
    let childOb=observer(val);//
    let dep=new Dep();
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            console.log('get val',val);
            dep.depend();
            if(childOb){
                childOb.dep.depend();
            }
            return val;
        },
        set:function(newVal){
            console.log('set newVal',newVal);
            if(val===newVal){
                return;
            }
            val=newVal;
            dep.notify();
        }
    })
}

export default Vue;



class Dep{//收集依赖
    constructor(){
        this.subs=[];
    }
    addSub(sub){
        this.subs.push(sub);
        console.log('add subs',this.subs);
    }
    removeSub(sub){
        remove(this.subs,sub);
    }
    depend(){
        if(window.target){
            this.addSub(window.target);
        }
    }
    notify(){
        const subs=this.subs.slice();
        console.log('start update');
        for(let i=0,l=subs.length;i<l;i++){
            subs[i].update();
        }
    }
}

function remove(arr,item){
    if(arr.length){
        const index=arr.indexOf(item);
        if(index>-1){
            arr.splice(index,1);
        }
    }
}

class Watcher{
    constructor(vm,expOrFn,cb){
        this.vm=vm
        this.getter=parsePath(expOrFn)
        this.cb=cb
        this.value=this.get()
    }
    get(){
        window.target=this
        let value=this.getter.call(this.vm,this.vm)
        window.target=undefined
        return value
    }
    update(){
        const oldVal=this.value;
        this.value=this.get()
        this.cb.call(this.vm,this.value,oldVal);
    }
}

const bailRE=/[^\w.$]/;
function parsePath(path){
    if(bailRE.test(path)) return;
    const segments=path.split('.')
    return function(obj){
        for(let i=0;i<segments.length;i++){
            if(!obj) return;
            obj=obj[segments[i]]
        }
        return obj;
    }
}

class Observer{
    constructor(value){
        console.log('Observer value',value);
        this.value=value;
        this.dep=new Dep();//因为数组在拦截器可以访问到，所以就开始收集依赖
        def(value,'__ob__',this);
        console.log('value is Array?',Array.isArray(value));
        if(Array.isArray(value)){
            // value.__proto__=arrayMethods;//把value的原型对象指向拦截器的
            const augment=hasProto ? protoAugment : copyAugment;
            augment(value,arrayMethods,arrayKeys);
            this.observeArray(value);
        }else{
            this.walk(value)
        }
    }
    walk(obj){
        console.log('walk obj',obj);
        const keys=Object.keys(obj)
        for(let i=0;i<keys.length;i++){
            defineReactive(obj,keys[i],obj[keys[i]])
        }
    }
    observeArray(items){
        for(let i=0,l=items.length;i<l;i++){
            observer(items[i]);
        }
    }
}

function protoAugment(target,src,keys){
    target.__proto__=src;
}

function copyAugment(target,src,keys){
    for(let i in keys){
        const key=keys[i];
        def(target,src,src[key]);
    }
}

/**
 * 
 * @param {*} value 
 * 为value创建一个Observe实例
 * 判断有没有__ob__，如果有的话，就直接返回
 * 否则新创建一个Observer实例
 * @param {*} asRootData 
 */
function observer(value,asRootData){
    console.log('observer tolower',value);
    if(!isObject(value)) return;
    let ob;
    if(hasOwn(value,'__ob__') && value.__ob__ instanceof Observer){
        console.log('已经实例化，直接赋值给值',value);
        ob=value.__ob__;
    }else{
        console.log('说明不存在，就开始实例化对象');
        ob=new Observer(value);
    }
    console.log('get ob',ob);
    return ob;
}

//判断是不是对象的
function isObject(obj){
    return obj!==null && typeof obj==='object';
}

//判断对象是否有这个属性
function hasOwn(obj,key){
    return Object.prototype.hasOwnProperty.call(obj,key);
}

//
function def(obj,key,val,enumerable){
    Object.defineProperty(obj,key,{
        value:val,
        enumerable:!!enumerable,
        writable:true,
        configurable:true,
    })
}