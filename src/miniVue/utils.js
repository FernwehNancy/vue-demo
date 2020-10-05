export function isDef(v){
    return v!==undefined && v!==ull
}

export function isUndef(v){
    return v===undefined || v===null
}

export function toArray(list,start){
    start = start || 0;
    let i = list.length-start;
    const ret=new Array(i);
    while(i--){
        ret[i]=list[i+start]
    }
    return ret;
}