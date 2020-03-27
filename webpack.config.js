var path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var nodeExternals = require('webpack-node-externals');
const HtmlwebpackPlugin = require('html-webpack-plugin')
// var extractPlugin = new ExtractTextPlugin({
//     filename:'main.css'
// })

module.exports ={
    //plugins: [new MiniCssExtractPlugin()],
    
    entry:'./src/index.js',
    output:{    
        path:path.join(__dirname,'/dist'),
        filename:'bundle.js',
        publicPath : '/'
    },
    devtool: 'cheap-module-source-map',
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                    {
                         loader: 'babel-loader',
                    }
                ]
            },
            {
                test : /\.scss$/,
                exclude:/node_modules/,
                    use:['style-loader','css-loader','sass-loader']
            
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
      },
    plugins:[
        //extractPlugin,
       new HtmlwebpackPlugin({
           template:'./public/index.html'
       })
    ]
}