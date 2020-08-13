const hasConlog = typeof console !=='undefined';

export let warn = (msg,vm)=>{
    if(hasConlog){
        console.error(`[vue warn]:${msg}${vm}`);
    }
}