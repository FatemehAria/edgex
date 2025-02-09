import type { FC } from 'react';

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown, Input, Layout, theme as antTheme, Tooltip } from 'antd';
import { createElement, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avator from '@/assets/header/avator.jpeg';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as FaIRSvg } from '@/assets/header/fa_IR.svg';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/header/sun.svg';
import AntdSvg from '@/assets/logo/antd.svg';
import ReactSvg from '@/assets/logo/react.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import { fileAddition } from '@/stores/files.store';
import { setGlobalState } from '@/stores/global.store';
import { setUserItem } from '@/stores/user.store';

import { logoutAsync } from '../../stores/user.action';
import { SearchContext } from '../home/context/SearchContext';
import HeaderNoticeComponent from './notice';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged, locale, device } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.global);
  const navigate = useNavigate();
  const token = antTheme.useToken();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const { setSearchInput, searchInput } = useContext(SearchContext);

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);

      const processedFiles = fileArray.map(file => ({
        media_id: Math.random().toString(16).slice(2),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: Date.now(),
        preview: URL.createObjectURL(file),
      }));

      dispatch(fileAddition({ files: processedFiles }));
    }

    event.target.value = '';
  };

  // const handleSearch: SearchProps['onSearch'] = value => {
  //   setSearchInput(value);
  //   // const search_result = files.filter(file => file.name.includes(value));
  //   console.log(value);
  // };

  return (
    <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
          <img src={AntdSvg} alt="" />
        </div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">{handleSidebarIcon()}</span>
        </div>
        {/* Search Input */}
        <div className="search-input-container">
          <Input
            placeholder={`${formatMessage({ id: 'gloabal.tips.searchInput' })}`}
            onChange={e => setSearchInput(e.target.value)}
            value={searchInput}
            className="search-input"
          />
          <SearchOutlined className="search-icon" />
        </div>
        <div className="actions">
          {/* Plus Icon for selecting file added */}
          <label style={{ cursor: 'pointer' }}>
            <Tooltip
              title={formatMessage({
                id: 'gloabal.tips.theme.addMedia',
              })}
            >
              <PlusOutlined style={{ fontSize: '30px' }} />
            </Tooltip>
            <input type="file" style={{ display: 'none' }} onChange={handleFileChange} multiple />
          </label>

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
          <HeaderNoticeComponent />
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

          {logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: (
                      <span onClick={() => navigate('/account')}>
                        <LocaleFormatter id="header.avator.account" />
                      </span>
                    ),
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined />,
                    label: (
                      <span onClick={() => onActionClick('logout')}>
                        <LocaleFormatter id="header.avator.logout" />
                      </span>
                    ),
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
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
