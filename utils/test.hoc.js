export default (Comp) => {
  function TestHocComp({Component,pageProps,...rest}){
    // const name = name + '2333';
    console.log(Component,pageProps,rest)
    if (pageProps) {
      pageProps.test = 123;
    }
    return <Comp pageProps={pageProps} Component={Component} {...rest}/>
  }
  TestHocComp.getInitialProps = Comp.getInitialProps
  return TestHocComp
}