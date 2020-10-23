import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
const Layout =  ({ children }) => {
  function goB(){
    Router.push('/b?id=3')
  }
  return (
    <>
    <header>
      <Link href="/a?id=2"title="aaa">
        <Button>A</Button>
      </Link>
      <Button onClick={goB}>B</Button>
    </header>
    {children}
    </>
  )
}
export default  Layout 
