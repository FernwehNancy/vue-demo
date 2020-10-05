export class VNode{
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
        this.tag=tag //当前节点的标签名
        this.data=data //当前节点对象的对象，包含了具体的一些数据信息，是一个VNodeData类型
        this.children=children //当前节点的子节点，数组
        this.text=text //当前节点的文本
        this.elm=elm //当前虚拟节点对应的真实dom节点
        this.ns=undefined //当前节点的名字空间
        this.context=context //编译作用域
        this.fnContext=undefined //函数化组件作用域
        this.fnOptions=undefined //
        this.fnScopeId=undefined
        this.key=data && data.key //节点的key属性，被当作节点的标注，用来优化
        this.componentOptions = componentOptions //组件的option选项
        this.componentInstance = undefined //当前节点对应的组件的实例
        this.parent = undefined //当前节点的父节点
        this.raw=false; //是否为原生HTML或普通文本，innerHTML为true，textContent时为false
        this.isStatic = false; //静态节点标志
        this.isRootInsert=true;//是否作为根节点插入
        this.isComment=false;//是否为注释节点
        this.isCloned=false;//是否为克隆节点
        this.isOnce=false;//是否有v-once指令
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
export function cloneVNode(vnode){
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