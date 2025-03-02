import type { SwitchProps } from 'antd';
import type { FC } from 'react';

import { Switch } from 'antd';

interface BaseSwitchProps extends SwitchProps {
  children?: React.ReactNode;
}

const BaseSwitch: FC<BaseSwitchProps> = ({ children: _ignored, ...props }) => {
  return <Switch {...props} />;
};

const MySwitch = Object.assign(Switch, BaseSwitch);

export default MySwitch;
