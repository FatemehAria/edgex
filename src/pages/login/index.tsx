import type { LoginParams } from '@/interface/user/login';
import type { FC } from 'react';

import './index.less';

import { Button, Checkbox, Dropdown, Form, Input, theme as antTheme } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as FaIRSvg } from '@/assets/header/fa_IR.svg';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import { setUserItem } from '@/stores/user.store';
import { formatSearch } from '@/utils/formatSearch';

import { loginAsync } from '../../stores/user.action';
import LoginCarousel from './LoginCarousel';

const initialValues: LoginParams = {
  username: 'guest',
  password: 'guest',
  // remember: true
};

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const { token } = antTheme.useToken();
  const { locale } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.global);
  const [capVerified, setCapVerified] = useState<boolean>(false);
  const SITE_KEY = import.meta.env.VITE_SITE_KEY;

  const onFinished = async (form: LoginParams) => {
    // if (!capVerified) {
    //   console.log('Captcha not verified!');

    //   return; // Block submission if captcha is not verified
    // }

    const res = dispatch(await loginAsync(form));

    if (!!res) {
      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/' };

      navigate(from);
    }
  };

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setUserItem({ locale: key }));
    localStorage.setItem('locale', key);
  };

  const verifyCaptcha = async (token: any) => {
    const res = await axios.post('/verifyCap', { capVal: token });

    setCapVerified(res.data.message.success);
  };

  return (
    <div>
      <LoginCarousel />
      <div
        //  style={{ backgroundColor: token.colorBgContainer }}
        className="login-container"
      >
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
          <span
            style={{
              color: `${theme === 'dark' ? 'white' : 'white'}`,
              fontSize: '1.25rem',
              padding: '1rem',
              display: 'inline-block',
            }}
          >
            <LanguageSvg id="language-change" />
          </span>
        </Dropdown>

        <div className="login-page">
          <Form<LoginParams>
            onFinish={onFinished}
            className="login-page-form"
            initialValues={initialValues}
            style={{ backgroundColor: token.colorBgContainer }}
          >
            <h2 style={{ direction: `${locale === 'en_US' ? 'ltr' : 'rtl'}` }}>
              {formatMessage({ id: 'gloabal.tips.loginPageWelcomeMessage' })}
            </h2>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'gloabal.tips.enterUsernameMessage',
                  }),
                },
              ]}
            >
              <Input
                placeholder={formatMessage({
                  id: 'gloabal.tips.username',
                })}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'gloabal.tips.enterPasswordMessage',
                  }),
                },
              ]}
            >
              <Input
                type="password"
                placeholder={formatMessage({
                  id: 'gloabal.tips.password',
                })}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>
                <LocaleFormatter id="gloabal.tips.rememberUser" />
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" className="login-page-form_button">
                <LocaleFormatter id="gloabal.tips.login" />
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
          <ReCAPTCHA
            sitekey={`${SITE_KEY}`}
            onChange={val => {
              if (val) verifyCaptcha(val);
            }}
            theme="dark"
            style={{ widows: '200px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
