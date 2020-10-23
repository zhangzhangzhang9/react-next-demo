/*
 * @Author: 张张张
 * @Date: 2020-10-10 14:38:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-13 16:19:18
 * @Description: 
 */
const withCss = require('@zeit/next-css');
const configs= {
  // 编译文件的输出目录
  distDir:'dist',
  // 是否给每个路由生成Etag
  generateEtags:true,
  // 页面内容缓存配置
  onDemandEntries:{
    // 内容在内存中缓存的时长(ms)
    maxInactiveAge:25*1000,
    //同时缓存多少个页面
    pagesBufferLength:2
  },
  // 在pages目录下哪种后缀的文件被认为是页面
  pageExtensions:['jsx','js'],
  // 配置buildId
  generateBuildId:async()=> {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID
    }
    // 返回 null使用默认的unique id
    return null
  },
  // 手动修改webpack
  webpack(config,options){
    return config
  },
  // 修改webpackDevMiddleware配置
  webpackDevMiddleware:config => {
    return config
  },
  // 可以在页面上通过 process.env.customKey 获取value
  env:{
    customKey:'value'
  },
  // 下面两个要通过 'next/config' 来读取
  // 只有在服务端渲染时才会获取的配置
  serverRuntimeConfig:{
    mySecret:'secret',
    secondSecret:process.env.SECOND_SECRET,
  },
  // 在服务端渲染和客户端渲染都可以获取的配置
  publicRuntimeConfig:{
    staticFolder:'/static',
  },
};

if (typeof require === 'undefined') {
  require.extensions['.css'] = file = {}
}
module.exports = withCss({})