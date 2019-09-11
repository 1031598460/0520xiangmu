import React, {Component} from 'react';
import { Form,Input,Icon,Button,message} from 'antd'
// import axios from 'axios'

import { connect } from 'react-redux'
// import { saveUser } from '../../redux/action-creators'
import { saveUser } from '@redux/action-creators'

import logo from './logo.png'
import './index.less'
import {reqLogin} from "../../api";


@connect(
    null,//不需要传东西
    { saveUser }
)
// Form.create 是一个高阶组件
// 目的：给Login组件传递form属性
// const newLogin = Form.create()(Login);
// export default newLogin;
@Form.create()
 class Login  extends Component {
    validator= (rule,value,callback) => {
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
    login= (e) => {
        e.preventDefault();
        this.props.form.validateFields((error,values) => {
            if (!error){
                const { username ,password}=values;
                //请求
                /*
                *axios.post('http://localhost:3000',{username,password})
                * .then(({data})=>{
                *     if(data.status===0){
                *       message.success('登录成功...');
                        //保存用户的数据===============================
                        this.props.saveUser(data.data);
                        //登录成功，跳转页面
                        this.props.history.replace('/home');
                *     }else{
                *       message.error(data.data.msg);
                *     }
                *     .catch((error) => {
                        message.error('未知错误，请联系管理员...');
                    })
                * })
                */
                reqLogin(username,password)
                    .then((result) => {
                        message.success('登录成功...');
                        //保存用户的数据===============================
                        this.props.saveUser(result);

                        //登录成功，跳转页面
                        this.props.history.replace('/home');
                    })
                    .catch(() => {
                        // message.error('未知错误，请联系管理员...');
                        this.props.form.resetFields(['password']);
                    })
            }
        })
    };
    render() {
        const { getFieldDecorator }=this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-section">
                    <h3>用户登录</h3>
                    <Form>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'username',
                                    {
                                        rules: [
                                            {validator: this.validator}
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
                                            {validator: this.validator}
                                        ]
                                    }
                                )(
                                    <Input prefix={<Icon type="lock" />} placeholder="密码" type="password"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-btn" onClick={this.login}>登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default Login;