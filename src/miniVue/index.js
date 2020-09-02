// const { resolveConstructorOptions } = require("../Vue/init");

function Vue(options){
    console.log('hello vue',options);
    this.$options = options;
    this.$data = options.data;
    new Observe(this.$data);
}

function defineReactive(data,key,val){
    if(typeof val==='object'){
        new Observe(val)
    }
    let dep=new Dep();
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            console.log('get 收集依赖')
            dep.depend()
            return val;
        },
        set:function(newVal){
            if(val===newVal) return;
            val=newVal;
            dep.notify();
            console.log(`${key}属性更新了：${val}更新了`)
        }
    })
}

class Observe{
    constructor(value){
        this.value=value;
        if(!Array.isArray(value)){
            this.walk(value);
        }
    }

    walk(obj){
        const keys = Object.keys(obj);
        for(let i=0;i<keys.length;i++){
            defineReactive(obj,keys[i],obj[keys[i]])
        }
    }
}

class Dep{
    constructor(){
        this.subs=[];
    }

    addSub(sub){
        this.subs.push(sub)
    }

    removeSub(sub){
        remove(this.subs,sub)
    }

    depend(){
        console.log('target',window.target);
        if(window.target){
            this.addSub(window.target)
        }
    }

    notify(){
        console.log('motify');
        const subs = this.subs.slice();
        for(let i=0,l=subs.length;i<l;i++){
            console.log('subs i',subs[i]);
            subs[i].update()
        }
    }
}

function remove(arr,item){
    if(arr.length>0){
        let index=arr.indexOf(item);
        if(index>-1){
           return arr.splice(index,1);
        }
    }
}

class Watcher{
    constructor(vm,expOrFn,cb){
        this.vm=vm;
        this.getter = expOrFn;
        this.cb=cb;
        this.value = this.get()
    }

    get(){
        window.target=this;
        let value = this.getter.call(this.vm,this.vm);
        window.target = undefined;
        return value;
    }

    update(){
        console.log('要更新了');
        const oldVal = this.value
        this.value = this.get()
        this.cb.call(this.vm,this.value,oldVal)
    }
}

const bailRE = /[^\w.$]/;
function parsePath(path){
    if(bailRE.test(path)) return;
}

export default Vue;