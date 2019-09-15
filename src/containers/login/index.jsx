import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';

import { reqLogin } from '../../api';
import withCheckLogin from '@conts/with-check-login';

import { connect } from 'react-redux';
import { saveUser } from '@redux/action-creators';

import logo from '@assets/images/logo.png';
import './index.less';

@withCheckLogin
@connect(
  null,
  { saveUser }
)
// Form.create 是一个高阶组件
// 目的：给Login组件传递form属性
// const newLogin = Form.create()(Login);
// export default newLogin;
@Form.create()
class Login extends Component {

  validator = (rule, value, callback) => {
    // console.log(rule, value);

    const name = rule.field === 'username' ? '用户名' : '密码';

    if (!value) {
      return callback(`请输入${name}`);
    }

    if (value.length < 3) {
      return callback(`${name}长度必须大于3位`);
    }

    if (value.length > 13) {
      return callback(`${name}长度必须小于13位`);
    }

    const reg = /^[a-zA-Z0-9_]{3,13}$/;
    if (!reg.test(value)) {
      return callback(`${name}只能包含英文、数字和下划线`);
    }

    // callback必须调用
    callback();
  };

  login = (e) => {
    // 禁止默认行为
    e.preventDefault();
    // 校验表单
    this.props.form.validateFields((error, values) => {
      if (!error) {
        const { username, password } = values;
        // 发送请求，请求登录
        /*axios.post('/login', { username, password })
          .then(({data}) => {
            // {data} --> 对response解构赋值
            // 请求成功
            // 判断status的值，来决定是否登录成功
            if (data.status === 0) {
              // 登录成功
              message.success('登录成功~');
              // 保存用户数据  redux  localStorage / sessionStorage
              this.props.saveUser(data.data);
              // 跳转到 / 路由
              /!*
                <Redirect to="/"/> 用于再render方法中进行重定向
                this.props.history.replace('/'); 用于非render方法中进行路由跳转
               *!/
              // return <Redirect to="/"/>
              this.props.history.replace('/');
            } else {
              // 登录失败
              message.error(data.msg);
            }
          })
          .catch((error) => {
            // 请求失败 - 登录失败
            message.error('未知错误，请联系管理员~');
          })
          .finally(() => {
            // 不管成功/失败都会触发
            // 清空密码
            this.props.form.resetFields(['password']);
          })*/
        reqLogin(username, password)
          .then((result) => {
            message.success('登录成功~');
            // 保存用户数据  redux  localStorage / sessionStorage
            this.props.saveUser(result);

            this.props.history.replace('/');
          })
          .catch(() => {
            // 清空密码
            this.props.form.resetFields(['password']);
          })
      }
    })
  };

  render() {
    // getFieldDecorator 专门表单校验的方法。 高阶组件
    const { getFieldDecorator } = this.props.form;

    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-section">
        <h3>用户登录</h3>
        <Form onSubmit={this.login}>
          <Form.Item>
            {
              getFieldDecorator(
                'username',
                {
                  rules: [
                    { validator: this.validator }
                  ]
                }
              )(
                <Input prefix={<Icon type="user" />} placeholder="用户名"/>
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator(
                'password',
                {
                  rules: [
                    {
                      validator: this.validator
                    }
                  ]
                }
              )(
                <Input prefix={<Icon type="lock" />} placeholder="密码" type="password"/>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
          </Form.Item>
        </Form>
      </section>
    </div>;
  }
}
export default Login;