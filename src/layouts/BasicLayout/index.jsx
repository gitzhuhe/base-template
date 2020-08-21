import React, {useState, useEffect} from 'react';
import {Shell, Balloon, Button,} from '@alifd/next';
import cookie from 'js-cookie';
import {logger, useHistory, store, APP_MODE} from 'ice';
import {useRequest} from '@/Config/BaseRequest';
import {userInfo} from '@/Config/ApiUrl/system/user';
import {deptTree} from '@/Config/ApiUrl/system/dept';
import MenuConfig from '@/Config/Menu';
import Logo from './components/Logo';
import UserInfo from './components/UserInfo';
import Menu from '../../components/LeftMenu';
import styles from './index.module.scss';

export default function BasicLayout({children}) {

  const history = useHistory();

  const {request: requestUser} = useRequest(userInfo, {manual: true});
  const {run: getUserInfo,data:user} = requestUser();

  const logout = () => {
    cookie.remove('Authorization');
    history.push('/user/login');
  };

  useEffect(() => {
    try {
      let data = cookie.get('Authorization');
      if (!data && APP_MODE === undefined) {
        throw new Error('本地登录信息不存在');
      } else {
        data = '';
      }
      const jwt = data.split('.');
      if (jwt.length !== 3 && APP_MODE === undefined) {
        throw new Error('本地登录信息错误');
      }
      if (jwt.length === 3) {
        console.log(window.atob(jwt[0]));
        const user = window.atob(jwt[1]);

        console.log(user);
      }

      getUserInfo();
    } catch (e) {
      logger.error(e.message);
      cookie.remove('Authorization');
      // TODO 登录超时处理
      // history.push('/user/login');
    }
  }, []);
  return (
    <></>
  );
}
