import {warn} from './util/index';
import {initMixin} from './init';

function Vue(options){
    console.log('hello vue');
    if(!(this instanceof Vue)){
        warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
    
}

initMixin(Vue);

export default Vue;