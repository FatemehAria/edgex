import type { FC } from 'react';

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Dropdown, Layout, theme as antTheme, Tooltip } from 'antd';
import { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avator from '@/assets/header/avator.jpeg';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as FaIRSvg } from '@/assets/header/fa_IR.svg';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/header/sun.svg';
import Egdex from '@/assets/logo/logo.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import { setGlobalState } from '@/stores/global.store';
import { setUserItem } from '@/stores/user.store';

import { logoutAsync } from '../../stores/user.action';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged, locale, device, username } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.global);
  const navigate = useNavigate();
  const token = antTheme.useToken();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  // const { setSearchInput, searchInput } = useContext(SearchContext);

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        console.log('clicked on logout');
        const res = Boolean(await dispatch(logoutAsync()));

        res && navigate('/login');

        return;
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setUserItem({ locale: key }));
    localStorage.setItem('locale', key);
  };

  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };

  const handleSidebarIcon = () => {
    if (collapsed && locale === 'fa_IR') {
      return <MenuFoldOutlined />;
    } else if (!collapsed && locale === 'fa_IR') {
      return <MenuUnfoldOutlined />;
    }

    if (collapsed && locale === 'en_US') {
      return <MenuUnfoldOutlined />;
    } else if (!collapsed && locale === 'en_US') {
      return <MenuFoldOutlined />;
    }
  };

  return (
    <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img src={Egdex} alt="edgex-logo" style={{ width: '300px' }} />
        </div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">{handleSidebarIcon()}</span>
        </div>
        {/* Search Input */}
        {/* <div className="search-input-container">
          <Input
            placeholder={`${formatMessage({ id: 'gloabal.tips.searchInput' })}`}
            onChange={e => setSearchInput(e.target.value)}
            value={searchInput}
            className="search-input"
          />
          <SearchOutlined className="search-icon" />
        </div> */}
        <div className="actions">
          {logged ? (
            <Dropdown
              menu={{
                onClick: info => {
                  if (info.key === 'logout') {
                    onActionClick('logout');
                  }
                },
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: <LocaleFormatter id="header.avator.logout" />,
                  },
                ],
              }}
            >
              <span className="user-action">
                <img src={Avator} className="user-avator" alt="avator" />
              </span>
            </Dropdown>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={toLogin}>
              {formatMessage({ id: 'gloabal.tips.login' })}
            </span>
          )}
          <Tooltip
            title={formatMessage({
              id: theme === 'dark' ? 'gloabal.tips.theme.lightTooltip' : 'gloabal.tips.theme.darkTooltip',
            })}
          >
            <span>
              {createElement(theme === 'dark' ? SunSvg : MoonSvg, {
                onClick: onChangeTheme,
              })}
            </span>
          </Tooltip>
          {/* <HeaderNoticeComponent /> */}
          <Dropdown
            menu={{
              onClick: info => selectLocale(info),
              items: [
                {
                  key: 'fa_IR',
                  icon: <FaIRSvg />,
                  disabled: locale === 'fa_IR',
                  label: 'فارسی',
                },
                {
                  key: 'en_US',
                  icon: <EnUsSvg />,
                  disabled: locale === 'en_US',
                  label: 'English',
                },
              ],
            }}
          >
            <span>
              <LanguageSvg id="language-change" />
            </span>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
