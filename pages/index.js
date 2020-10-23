/*
 * @Author: 张张张
 * @Date: 2020-10-10 10:04:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-12 15:35:14
 * @Description: 
 */
// import Head from 'next/head'
import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import store from '../store/store'
import {connect} from 'react-redux';
const events = [
  "routeChangeStart",
  "routeChangeComplete",
  "routeChangeError",
  "beforeHistoryChange",
  "hashChangeStart",
  "hashChangeComplete",
];
function makeEvent(type){
  return (...args) =>{
    console.log(type,...args)
  }
}
// events.forEach(e=>{
//   Router.events.on(e,makeEvent(e))
// })
const Home = ({count,user,rename,add})=> {
  {
    return (
      <>
      <span>count{count}</span>
      <span>name{user}</span>
      <input value={user} onChange={(e)=> {rename(e.target.value)}}/>
      <button onClick={()=> add(count)}>do add</button>
      </>
    )
  }
}
export default connect(
  function mapStateToProps(state){
    return {
      count: state.count.count,
      user:state.user.username
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      add:(num)=> dispatch({type:'ADD',num}),
      rename:(name) => dispatch({type:'UPDATE_USERNAME',name})
    }
  }
)(Home)
