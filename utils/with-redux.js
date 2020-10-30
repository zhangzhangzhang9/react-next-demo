import React from 'react'
import createStore from '../store/store';
const isServer = typeof window === 'undefined';
const __NEXT_REUDX_STORE__ = '__NEXT_REUDX_STORE__';

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState)
  }

  if (!window[__NEXT_REUDX_STORE__]) {
    window[__NEXT_REUDX_STORE__] = createStore(initialState)
  }
  return window[__NEXT_REUDX_STORE__]
}

export default (Comp) => {
  class WithReduxApp extends React.Component {
    constructor(props){
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }
    render() {
      const {
        Component,
        pageProps,
        ...rest
      } = this.props;
      // const name = name + '2333';
      console.log(Component, pageProps, rest)
      if (pageProps) {
        pageProps.test = 123;
      }
      return <Comp pageProps = { pageProps} Component = {Component} {...rest } reduxStore={this.reduxStore}
      />
    }
  }

  WithReduxApp.getInitialProps = async (ctx) => {
    const reduxStore = getOrCreateStore();
    ctx.reduxStore = reduxStore;
    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }
    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    }
  }
  return WithReduxApp
}