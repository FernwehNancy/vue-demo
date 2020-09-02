import Vue from './miniVue/index.js';

const app = new Vue({
    el:'#demo',

    data:{
        message:"Hello I'm vuejs",
    }
});
app.$data.message='hello I have changed';
document.write(app.$data.message);
// document.getElementById('con').innerHTML = app.$data.message;
