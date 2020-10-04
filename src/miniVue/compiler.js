function createASTElement(tag,attrs,parent){
    return {
        type:1,
        tag,
        attrsList: attrs,
        parent,
        children:[],
    }
}

parseHTML(template,{
    //start钩子函数
    start(tag,attrs,unary){
        // let element=createASTElement(tag,attrs,currentParent)
    },
    //end钩子函数
    end(){

    },
    //文本钩子函数
    chars(text){
        let text=text.trim();
        if(text){
            const children=currentParent.children;
            let expression;
            if(expression=parseText(text)){
                children.push({
                    type:2,
                    expression,
                    text
                })
            }else{
                children.push({
                    type:2,
                    text
                })
            }
        }
    },
    //注释钩子函数
    comment(text){
        let element = {type:3,text,isComment:true}
    }
})

function makeMap(str,expectsLowerCase){
    const map=Object.create(null)
    const list=str.split(',')
    for(let i=0;i<list.length;i++){
        map[list[i]]=true
    }
    return expectsLowerCase ? val=>map[val.toLowerCase()] : val=>map[val]
}

const isPlainTextElement = makeMap('script,style,textarea',true);
// Regular Expressions for parsing tags and attributes
//解析class=, id=..
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/

//解析动态变量，事件比如 :name, @click
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
//开始标签的正则
const startTagOpen = new RegExp(`^<${qnameCapture}`)
//结束闭合标签的正则
const startTagClose = /^\s*(\/?)>/
//结束标签的正则
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
//doctype的正则
const doctype = /^<!DOCTYPE [^>]+>/i;//匹配<!DOCTYPE>
//注释的正则表达式
const comment=/^<!\--/;//匹配 <!--
//条件注释的正则
const conditionalComment = /^<!\[/; //匹配<![]


function parseHTML(html,options){
    const stack=[];
    let last,lastTag;
    let index=0;


    //截取html字符串
    function advance(n){
        index+=n;
        html = html.substring(n);
    }

    while(html){//判断html还在不在，如果在的话，就继续执行下面的步骤
        if(!lastTag || !isPlainTextElement(lastTag)){
            /**
             * 获取"<"的下标位置，如果是0,有几种情况：
             * 可能是开始标签，比如<div>,<p>
             * 可能是注释标签，比如<!-- 
             * 可能是doctype，比如<!DOCTYPE 
             * 可能是文本，比如<1<2
             */
            let textEnd=html.indexOf('<');
            if(textEnd===0){
                //注释：
                if(comment.test(html)){
                    const commentEnd = html.indexOf('-->')
                    
                    if(commentEnd>=0){
                        if(options.shouldKeepComment){//是否触发钩子函数
                            options.comment(html.substring(4,commentEnd),index,index+commentEnd+3);
                        }
                        advance(commentEnd+3)
                        continue;
                    }
                }

                //条件注释
                //<!--[if IE]> html语句 <![endif]-->
                if(conditionalComment.test(html)){
                    const conditionalEnd=html.indexOf(']>')

                    if(conditionalEnd>=0){
                        advance(conditionalEnd+2)
                        continue
                    }
                }

                //DOCTYPE
                //<!DOCTYPE html>
                /**
                 * 比如说html内容为<!DOCTYPE html><html lang="en"><head></head><body></body></html>
                 * 然后用match获取到“<!DOCTYPE html>”
                 * 然后截取长度，得到剩下的html
                 */
                const doctypeMatch=html.match(doctype)
                if(doctypeMatch){
                    advance(doctypeMatch[0].length)
                    continue
                }

                //结束标签
                const endTagMatch = html.match(endTag)
                if(endTagMatch){
                    const curIndex = index;
                    advance(endTagMatch[0].length)
                    parseEndTag(endTagMatch[1],curIndex,index)
                    continue
                }

                //开始标签
                const startTagMatch = parseStartTag()
                if(startTagMatch){
                    handleStartTag(startTagMatch)
                    // if(showldIgnoreFirstNewline(startTagMatch.tagName,html)){
                    //     advance(1)
                    // }
                    continue
                }
            }

            //解析开始标签
            function parseStartTag(){
                /**
                 * 解析html模板，比如说
                 * <div class="box" id="el"></div>
                 */
                const start = html.match(startTagOpen);
                if(start){
                    const match={
                        tagName: start[1],//解析得到div
                        attrs: [],
                        start: index
                    }
                    /**
                     * 截取后，就得到‘ class="box" id="el"></div>'
                     */
                    advance(start[0].length);
                    let end,attr;
                    // attr=html.match(dynamicArgAttribute) ||
                    /**
                     * 判断是否是自闭和标签和是否还有属性，比如class,id,style,其他的属性等等
                     */
                    while(!(end=html.match(startTagClose)) && ( html.match(attribute))){
                        attr.start=index;
                        advance(arrt[0].length)
                        attr.end=index;
                        match.attrs.push(attr)
                    }
                    if(end){
                        match.unarySlash=end[1]
                        advance(end[0].length);
                        match.end=index;
                        return match
                    }
                }
            }

            function parseEndTag(tagName,start,end){
                let pos,lowerCasedTagName;
                if(start==null) start=index;
                if(end==null) end=index;
                
                if(tagName){
                    lowerCasedTagName = tagName.toLowerCase();
                    for(pos=stack.length-1;pos>=0;pos--){
                        if(stack[pos].lowerCasedTag === lowerCasedTagName){
                            break;
                        }
                    }
                }else{
                    pos=0
                }
                
                if(pos>=0){
                    for(let i=stack.length-1;i>=pos;i--){
                        if(opetions.end){
                            options.end(stack[i].tag,start,end)
                        }
                    }
                    stack.length=pos;
                    lastTag=pos && stack[pos-1].tag;
                }else if(lowerCasedTagName==='br'){
                    if(options.start){
                        options.start(tagName,[],true,start,end)
                    }
                }else if(lowerCasedTagName==='p'){
                    if(options.start){
                        options.start(tagName,[],false,start,end)
                    }
                    if(options.end){
                        options.end(tagName,start,end)
                    }
                }
        
            }
        }
    }
}



//解析文本
const defaultTagRE = /\{\{((?:.||\r?\n)+?)\}\}/g;

//判断是否有带变量的文本
function parseText(text){
    const tagRE=defaultTagRE;
    if(!tagRE.test(text)){//如果没有带变量的，则直接结束
        return 
    }

    const tokens=[];
    let lastIndex=tagRE.lastIndex=0;
    let match,index;
    /**
     * 比如说text='你好哇{{name}}，你今年已经{{age}}岁啦!';
     * 然后因为带有变量，才会开始执行下一步
     * 用exec匹配，得到index位置为3，就是你好哇的位置
     * 然后match[1]=name
     * text.slice(lastIndex,index)就是取你好哇，然后转换json格式，添加到tokens
     * 然后把name也加到tokens，知识前面要加上_s，表示是变量的
     * 最后当所有的变量处理完成后，如果text还有文本的，则把该文本加到tokens
     * 
     */
    while((match=tagRE.exec(text))){
        index=match.index;
        if(index>lastIndex){
            tokens.push(JSON.stringify(text.slice(lastIndex,index)))
        }
        tokens.push(`_s(${match[1].trim()})`);
        
        lastIndex = index+match[0].length;
    }
    if(lastIndex<text.length){
        tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return tokens.join('+')
}