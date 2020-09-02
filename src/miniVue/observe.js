export class Observe{
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

export class Dep{
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