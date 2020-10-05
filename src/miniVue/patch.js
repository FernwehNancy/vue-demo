
import {
    isDef,
    isUndef
} from './utils';
import {VNode,cloneVNode} from './vnode';

const hooks=['create','activate','update','remove','destroy']

function createPatchFunction(backend){
    const {modules,nodeOps} = backend;

    //增加节点
    function addVnodes(parentElm,refElm,vnodes,startIdx,endIdx,insertedVnodeQueue){
        for(;startIdx<=endIdx;++startIdx){
            createElm(vnodex[startIdx],insertedVnodeQueue,parentElm,refElm,false,vnodes,startIdx);
        }
    }
    //删除节点
    function removeVnodes(vnodes,startIdx,endIdx){
        for(; startIdx<=endIdx;++startIdx){
            const ch=vnodes[startIdx]
            if(isDef(ch)){
                removeNode(ch.elm);
            }
        }
    }

    function createElm(
        vnode,
        insertedVnodeQueue,
        parentElm,
        refElm,
        nested,
        ownerArray,
        index
    ){
        if(isDef(vnode.elm) && isDef(ownerArray)){
            vnode = ownerArray[index] = cloneVNode(vnode);
        }
        
        const data=vnode.data;
        const children=vnode.children;
        const tag=vnode.tag;
        vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns,tag) : nodeOps.createElement(tag,vnode);
        
    }

    function removeNode(el){
        const parent=nodeOps.parentNode(el);
        if(isDef(parent)){
            nodeOps.removeChild(parent,el)
        }
    }

    //返回值
    return function patch(oldVnode,vnode,hydrating,removeOnly){
        // if(idUndef(vnode)){
        //     if(isDef(oldVnode)) invokeDestroyHook(oldVnode)
        //     return;
        // }

        let isInitialPatch = false;
        const insertedVnodeQueue = [];

        if(isUndef(oldVnode)){
            isInitialPatch = true;
            createASTElement(vnode,insertedVnodeQueue);
        }else{
            
        }
    }
}