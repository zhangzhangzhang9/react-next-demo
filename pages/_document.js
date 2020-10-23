/*
 * @Author: 张张张
 * @Date: 2020-10-12 15:31:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-14 17:01:42
 * @Description: 
 */
import Document,{Html,Head,Main,NextScript} from 'next/document';
import { ServerStyleSheet } from 'styled-components'
function withLog(Comp){
  return (props)=> {
    console.log('props',props)
    return<Comp {...props}/>
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx){
    const originalRenderPage = ctx.renderPage;
    const sheet = new ServerStyleSheet();
    try{
      ctx.renderPage = () => originalRenderPage({
        enhanceApp:App =>(props) => sheet.collectStyles(<App {...props}/>)
      });
      const props = await Document.getInitialProps(ctx);
      return {
        ...props,
        styles:(<>{props.styles}{sheet.getStyleElement()}</>)
      }
    } finally{
      sheet.seal()
    }
  }
  render(){
    return(
      <Html>
      <Head>
      </Head>
      <body>
        <Main></Main>
        <NextScript/>
      </body>
    </Html>
    )
  }
}
export default MyDocument;