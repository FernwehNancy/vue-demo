import VNode,{cloneVNode} from './vnode';

/** 是否是相同节点 */
function sameVnode(a,b){
    return(
        a.key === b.key && (
            (
                a.tag === b.tag &&
                a.isComment === b.isComment &&
                
            )
        )
    )
}