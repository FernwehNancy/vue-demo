//data数据处理

export function stateMixin(Vue){
    const dataDef = {}
    dateDef.get=function(){return this._data}
    const propsDef = {}
    propsDef.get=function(){return this._props}
    
}