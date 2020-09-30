import Vue from './miniVue/index.js';

const app = new Vue({
    el:'#demo',
    data:{
        // info:{
        //     name:'fernweh',
        //     age:12
        // },
        list:[1,2,3]
    },
});

console.log(app.$data.list);
// console.log(app.$data.name="change data")
