import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import replace from 'rollup-plugin-replace';

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
            port:3000,
            openPage:'/index.html',
            contentBase:'',
        }),
        replace({
            'process.env.NODE_ENV':JSON.stringify('development'),
            // 'process.env.'
        })
    ]
}