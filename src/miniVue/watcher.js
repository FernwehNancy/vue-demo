export class Watcjer{
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