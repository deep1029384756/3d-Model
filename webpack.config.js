const path= require("path");
const htmlwebpackplugin = require("html-webpack-plugin");

module.exports= {
    mode:"development",
    entry:{
        bundle:path.resolve(__dirname, "src/index.js")
    },
    output :{
        path:path.resolve(__dirname, "dist"),
        filename:'[name][contenthash].js',
        clean:true,
        assetModuleFilename:'[name][ext]'
    },
    devServer : {
        static : {
            directory:path.resolve(__dirname, 'dist')
        },
        port:3001,
        open:true,
        hot:true,
        compress:true,
        // historyApiFallBack:true,
    },
    module :{
        rules:[
            {
                test:/\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                // test:/\.js$/,
                // exclude: /node_modules/,
                // use:{
                //     loader:'babel-loader',
                //     options:{
                //         presets:['@babel/preset-env'],
                //     }
                // }
            },
            {
                test :/\.(png|svg|jpg|jpeg|gif|glb)$/i,
                type : 'asset/resource',  //built it module
            }
        ]
    },
    plugins:[
        new htmlwebpackplugin({
            title :'webpack app',
            filename:'index.html',
            template:'src/template.html'
        }),
      //  new SpriteLoaderPlugin(),
    ],
}