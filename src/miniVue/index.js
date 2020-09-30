function Vue(options){
    console.log('init vue',options);
    this.$data=options.data;
    this.$options=options;
    new Observer(this.$data);
}

function defineReactive(data,key,val){//数据劫持
    if(typeof val==='object'){
        new Observer(val);
    }
    let dep=new Dep();
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            console.log('get val',val);
            dep.depend();
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
        this.value=value;
        console.log('value is Array?',Array.isArray(value));
        if(!Array.isArray(value)){
            this.walk(value)
        }
    }
    walk(obj){
        const keys=Object.keys(obj)
        for(let i=0;i<keys.length;i++){
            defineReactive(obj,keys[i],obj[keys[i]])
        }
    }
}