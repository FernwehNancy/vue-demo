import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

export default{
    input:'src/index.js',
    output:{
        file:'dist/vue.js',
        name:'Vue',
        sourcemap:true
    },
    plugins:[
        livereload(),
        serve({
            open:true,
            port:300,
            openPage:'/index.html',
            contentBase:'',
        })
    ]
}