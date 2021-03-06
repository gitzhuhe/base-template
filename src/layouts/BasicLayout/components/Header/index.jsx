import React, {useState} from 'react';
import {
  SettingOutlined,
} from '@ant-design/icons';
import Icon from '@/components/Icon';
import {Drawer} from 'antd';
import store from '@/store';
import {useHistory} from 'ice';
import AppEntFUNC from '@/asseset/imgs/88.png';

import styles from './index.module.less';

const AppIcon = {
  ENT_FUNC: AppEntFUNC,
  BASE_SYSTEM: AppEntFUNC
};

const Header = () => {

  const history = useHistory();

  const [userInfo] = store.useModel('user');
  const {menus} = userInfo;

  const [visible, setVisible] = useState(false);
  return (
    <>
      <header className={styles.navbar}>
        <div className={`row-flex ${styles.inner}`}>
          <div className={`${styles.systemBar}`}>
            <div className={styles.left}>
              <div id="navigation-dock">
                <div id="mainMenu" onClick={() => {
                  setVisible(true);
                }}>
                  <Icon type="icon-gongnengtubiao-134"/>
                </div>
              </div>
              <div id="navigation-title">
                React快速开发后台框架
              </div>
            </div>
            <div className={styles.middle}/>
            <div className={styles.right}>
              <div><SettingOutlined/></div>
            </div>
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        closable={false}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        width={325}
        maskStyle={{opacity: 0, background: 'none'}}
        bodyStyle={{padding:0,margin:0}}
      >
        <div className="docker-top-container">
          <div className="docker-top-title">
            <div className="css-1b5qfbo">
              <Icon type="icon-gongnengtubiao-134"/>
            </div>
            <div className="docker-top-text"><span aria-haspopup="true" aria-expanded="false">AT-Soft</span></div>
          </div>
        </div>
        <div className="docker-middle">
          <div className={styles.appContent}>
            {menus && Array.isArray(menus) && menus.map((item, index) => {
              return (
                <div className={styles.appItemWrap} key={index} onClick={() => {
                  history.push(`/${item.id}`);
                }}>
                  <div className="app-item">
                    <div className="item-logo-wrap">
                    <span className="navigation-badge">
                      <img className="app-item-logo" src={AppIcon[item.id]} alt="logo"/>
                    </span>
                    </div>
                    <div className="app-item-name">
                      {item.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
