import {toArray} from './utils';

export function eventsMixin(Vue){
    /**
     * 增加监听
     * @param {事件名} event 
     * event可以是数组也可以是字符串的
     * @param {回调函数} fn 
     * 注册事件时把回调函数收集起来的
     * 然后在触发事件时就调用回调函数即可
     * 
     */
    Vue.prototype.$on=function(event,fn){
        const vm=this;
        if(Array.isArray(event)){
            for(let i=0,l=event.length;i<l;i++){
                this.$on(event[i],fn)
            }
        }else{
            (vm._event[event] || (vm._event[event] =[])).push(fn);
        }
        return vm;
    }

    /**
     * 一次性监听
     * @param {*} event 
     * @param {*} fn 
     */
    Vue.prototype.$once=function(event,fn){
        const vm=this;
        function on(){
            vm.$off(event,on);
            fn.apply(vm,arguments);
        }
        on.fn=fn;
        vm.$on(event,on);
        return vm
    }
    
    /**
     * 移除监听事件
     * @param {事件名} event 
     * @param {回调函数} fn 
     */
    Vue.prototype.$off=function(event,fn){
        const vm=this;
        //如果不传任何参数，则把事件所有的都为null
        if(arguments.length===0){
            vm._events=Object.create(null);
            return vm;
        }
        if(Array.isArray(event)){
            for(let i=0,l=event.length;i<l;i++){
                this.$off(event[i],fn)
            }
        }
        const cbs=vm._events[event];
        if(!cbs){
            return vm;
        }
        if(arguments.length===1){
            vm._events[event]=null;
            return vm;
        }
        //如果有fn
        if(fn){
            let cbs=vm._events[event];
            let cb;
            let i=cbs.length;
            while(i--){
                cb=cbs[i];
                if(cb===fn || cb.fn===fn){
                    cbs.splice(i,1);
                    break;
                }
            }
        }
        return vm;
    }

    /**
     * 触发当前实例的事件
     * @param {*} event 
     * 因为之前存过vm._events,
     * 所以触发时，就去这个vm._events寻找对应的事件名
     */
    Vue.prototype.$emit=function(event){
        const vm=this;
        let cbs=vm._events[event];
        if(cbs){
            const args=toArray(arguments,1);
            for(let i=0,l=cbs.length;i<l;i++){
                try{
                    cbs[i].apply(vm,arg);
                }catch(e){
                    console.error(e);
                }
            }
        }
        return vm;
    }
}

export function initEvents(vm){
    console.log('初始化事件');
    vm._events=Object.create(null);
}