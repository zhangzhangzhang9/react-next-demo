/*
 * @Author: 张张张
 * @Date: 2020-10-10 15:00:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-13 16:00:05
 * @Description: 
 */
import dynamic from 'next/dynamic'
import {withRouter} from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import style from '../styles/Home.module.css'
import styled from 'styled-components';
import getConfig from 'next/config'
// import moment from 'moment';
const Title =styled.h1`color:orange;font-size:36px;`;
const Comp2 = dynamic(import('../components/Com.jsx'))
const  A = ({router,name,time})=> {
  return (
    <>
    <Title> Title {time}</Title>
      <Comp2/>
  <Link href="/b?id=2"><span className= {style.ces}>ABC{router.query.id}{name}{process.env.customKey}</span></Link>
      <style jsx>
       {`
        span{
          color:orange
        }
      `}
      </style>
    </>
  )
}
A.getInitialProps = async () => {
  const moment = await import ('moment')
  const promise = new Promise((resolve, reject) =>{
    setTimeout(()=>{
      resolve({
        name:'ces',
        time:moment.default(Date.now() - 60*1000).fromNow()
      })
    },10)
  })
  return await promise
}
export default withRouter(A);