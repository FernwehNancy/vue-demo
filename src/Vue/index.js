import {warn} from './util/index';
import {initMixin} from './init';
import {stateMixin} from './state';

function Vue(options){
    console.log('hello vue');
    if(!(this instanceof Vue)){
        warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
    
}

initMixin(Vue);
stateMixin(Vue);

export default Vue;