import Vue from './miniVue/index.js';

const app = new Vue({
    el:'#demo',
    data:{
        info:{
            name:'fernweh',
            age:12
        }
    },
});

console.log(app.$data.info.name);
// console.log(app.$data.name="change data")