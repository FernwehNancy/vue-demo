class VNode{
    constructor(
        tag,
        data,
        children,
        text,
        elm,
        context,
        componentOptions,
        asyncFactory
    ){
        this.tag=tag //标签
        this.data=data //数据集合
        this.children=children //
        this.text=text
        this.elm=elm
        this.ns=undefined
        this.context=context
        this.fnContext=undefined
        this.fnOptions=undefined
        this.fnScopeId=undefined
        this.key=data && data.key
        this.componentOptions = componentOptions
        this.componentInstance = undefined
        this.parent = undefined
        this.raw=false;
        this.isStatic = false;
        this.isRootInsert=true;
        this.isComment=false;
        this.isCloned=false;
        this.isOnce=false;
        this.asyncFactory=asyncFactory;
        this.asyncMeta = undefined;
        this.isAsyncPlaceholder=false;
    }

    get child(){
        return this.componentOptions
    }
}

//创建注释节点
const createEmptyVNode=(text)=>{
    const node = new VNode();
    node.text=text;
    node.isComment=true;
    return node;
}


//创建文本节点
function createTextVNode=(val)=>{
    return new VNode(undefined,undefined,undefined,String(val))
}

//克隆节点
function cloneVNode(vnode){
    const cloned=new VNode(
        vnode.tag,
        vnode.data,
        vnode.children && vnode.children.slice(),
        vnode.text,
        vnode.elm,
        vnode.context,
        cnode.componentOptions,
        vnode.asyncFactory
    )
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.fnContext = vnode.fnContext
    cloned.fnOptions = vnode.fnOptions
    cloned.fnScopeId = vnode.fnScopeId
    cloned.asyncMeta = vnode.asyncMeta
    cloned.isCloned = true
    return clone;
}