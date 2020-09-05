import Vue from './miniVue/index.js';

const app = new Vue({
    el:'#demo',
    data:{
        message:1,
        a:1
    },
});
app.$watch('message',function(newVal,val){
    // console.log('哈哈，$watch成功')
    console.log('watch success, newVal is'+newVal+'oldVal is'+val);
})

// setTimeout(()=>{
//     // console.log('setTimeout')
//     app.$data.a=5;
// },2000)
