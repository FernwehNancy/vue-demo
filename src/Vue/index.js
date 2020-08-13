// import {warn} from './util/index';

function Vue(){
    console.log('hello vue');
    if(!(this instanceof Vue)){
        warn('请使用new Vue()实例化');
        // return;
    }
    this._init();
}

export default Vue;