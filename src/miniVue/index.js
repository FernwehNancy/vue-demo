// const { resolveConstructorOptions } = require("../Vue/init");

function Vue(options){
    console.log('hello vue',options);
    this.$options = options;
    this.$data = options.data;
    new Observe(this.$data);
}

Vue.prototype.$watch = function(expOrFn,cb,options){
    const vm = this;
    options = options || {};
    const watcher = new Watcher(vm,expOrFn,cb,options);
    return function unwatchFn(){
        watcher.tearndown();
    }
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

let uid = 0;
class Dep{
    constructor(){
        this.id = uid++;
        this.subs=[];
    }

    addSub(sub){
        this.subs.push(sub)
        console.log('this.subs',this.subs);
    }

    removeSub(sub){
        remove(this.subs,sub)
    }

    depend(){
        console.log('target',window.target);
        if(window.target){
            console.log('增加到sub');
            window.target.addDep(this);
            // this.addSub(window.target)
        }
    }

    notify(){
        console.log('notify',this.subs);
        const subs = this.subs.slice();
        console.log('slice',subs);
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
        console.log('hello watcher');
        this.vm=vm;
        this.deps =[];
        this.depIds = new Set();
        // this.getter = parsePath(expOrFn);
        // console.log('this.getter',this.getter);
        this.expOrFn = expOrFn;
        this.cb=cb;
        this.value = this.get()
    }

    get(){
        // console.log('get',this.expOrFn);
        window.target=this;
        console.log('window.target',window.target);
        let value = this.vm.$data[this.expOrFn];
        // let value = this.getter.call(this.vm,this.vm);
        console.log('value',value);
        window.target = undefined;
        return value;
    }

    update(){
        console.log('要更新了');
        const oldVal = this.value
        this.value = this.get()
        this.cb.call(this.vm,this.value,oldVal)
    }

    addDep(dep){
        const id = dep.id;
        if(!this.depIds.has(id)){
            this.depIds.add(id);
            this.deps.push(dep);
            dep.addSub(this)
        }
    }

    tearndown(){
        let i = this.deps.length;
        while(i--){
            this.deps[i].removeSub(this);
        }
    }
}

const bailRE = /[^\w.$]/;
function parsePath(path){
    if(bailRE.test(path)) return;
    const segments = path.split('.')
    console.log('segments',segments);
    return function(obj){
        for(let i=0;i<segments.length;i++){
            console.log('obj',obj);
            if(!obj) return;
            obj = obj.$data[segments[i]]
        }
        console.log('ob2',obj);
        return obj;
    }
}

export default Vue;