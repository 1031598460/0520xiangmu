import React, { Component } from 'react';
import { Button, Icon ,Modal} from 'antd';
import screenfull from 'screenfull';
import { withTranslation, getI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { removeUser} from '@redux/action-creators';
import dayjs from 'dayjs';

import './index.less';

@connect(
    (state)=>({username:state.user.user.username ,title:state.title}),
    { removeUser }
)
@withTranslation()
class HeaderMain extends Component {
  state = {
    isScreenFull: false,
    isEnglish: getI18n().language === 'en',
    time: dayjs().format('YYYY-MM-DD HH:mm:ss')
  };

  screenFull = () => {
    if (screenfull.isEnabled) {
      // 切换全屏
      screenfull.toggle();
    }
  };

  change = () => {
    this.setState({
      isScreenFull: !this.state.isScreenFull
    })
  };

  changeLanguage = () => {
    const isEnglish = !this.state.isEnglish;

    this.props.i18n.changeLanguage(isEnglish ? 'en' : 'zh-CN');

    this.setState({
      isEnglish
    })
  };

  componentDidMount() {
    // 绑定事件
    screenfull.on('change', this.change);
    setInterval(() => {
      this.setState({
        time:dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    },1000)
  }

  componentWillUnmount() {
    // 解绑事件
    screenfull.off('change', this.change);
  }

  logout= () => {
    Modal.confirm({
      title:'您确定要退出吗？',
      onOk: () => {
        this.props.removeUser();
      },
      okText:'确定',
      cancelText:'取消'
    })
  };

  render() {
    const { isScreenFull, isEnglish ,time} = this.state;
    const { username,title,t}=this.props;

    return <div className="header-main">
      <div className="header-main-top">
        <Button size="small" onClick={this.screenFull}><Icon type={isScreenFull ? 'fullscreen-exit' : 'fullscreen'} /></Button>
        <Button size="small" className="header-main-btn" onClick={this.changeLanguage}>{isEnglish ? '中文' : 'English'}</Button>
        <span>欢迎, {username}</span>
        <Button type="link" onClick={this.logout}>退出</Button>
      </div>
      <div className="header-main-bottom">
        <h3>{t(title)}</h3>
        <span>{time}</span>
      </div>
    </div>;
  }
}

export default HeaderMain;