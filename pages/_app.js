/*
 * @Author: 张张张
 * @Date: 2020-10-10 10:04:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-14 16:45:06
 * @Description: 
 */
import App from 'next/app';
import '../styles/globals.css'
import 'antd/dist/antd.css'
import {Button} from 'antd';
import Layout from '../components/Layout.jsx'
import MyContext from '../utils/my-context'
import {Provider} from 'react-redux';
import store from '../store/store';
import WithReduxApp from '../utils/with-redux'
// const state = {
//   value:'zzz'
// }
// function MyApp({ Component, pageProps }) {
//   return (
//     <Layout>
//       <MyContext.Provider value={state}>
//       <Component {...pageProps}/>
//       <Button onClick={()=>state.value+'111' }>undate Context</Button>
//       </MyContext.Provider>
//       </Layout>
//   )
// }
class MyApp extends App {
  state ={
    context:'zzz'
  }
  static async getInitialProps(ctx){
  const {Component} = ctx;
    console.log('app init')
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {pageProps}
  }
render(){
  const { Component,pageProps,reduxStore} = this.props;
  return(
      <Layout>
      {/* <MyContext.Provider value={this.state.context}> */}
        <Provider store = {reduxStore}>
      <Component {...pageProps}/>
      </Provider>
      <Button onClick={()=>this.setState({context:`${this.state.context}111`})}>undate Context</Button>
      {/* </MyContext.Provider> */}
      </Layout>
  )
}
}
export default WithReduxApp(MyApp)
