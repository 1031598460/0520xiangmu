import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
/*
  高阶组件：
    功能：用来做登录验证的
 */
function withCheckLogin(WrappedComponent) {

  return connect(
    (state) => ({token: state.user.token}),
    null
  )(class extends Component {
    static displayName = `CheckLogin(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    render() {

       //登录校验

      const {token, ...rest} = this.props;// 包含剩下所有属性的一个对象  { location, history, match, children }
      const { location : { pathname } } = rest;
      /*if (pathname === '/login') {
        if (token) {
          return <Redirect to="/"/>
        }
      } else {
        if (!token) {
          return <Redirect to="/login"/>
        }
      }*/
      if (pathname === "/login" && token) return <Redirect to="/"/>;
      if (pathname !== "/login" && !token) return <Redirect to="/login"/>;
      return <WrappedComponent {...rest}/>;
    }
  })
}
export default withCheckLogin;
