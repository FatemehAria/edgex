import type { FormItemProps } from 'antd/es/form';
import type { FC } from 'react';

import { Checkbox, DatePicker as AntdDatePicker, Form, Input, InputNumber, Radio, Select, Switch } from 'antd';
import { DatePicker as DatePickerJalali } from 'antd-jalali';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

const DatePicker: any = AntdDatePicker;

export type ControlTypes =
  | 'input'
  | 'input-number'
  | 'switch'
  | 'date-picker'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'textarea';

type GetRCPropsType<T> = T extends (props: infer R) => any ? R : T extends React.ComponentClass<infer R> ? R : any;

type InnerProps = {
  input: GetRCPropsType<typeof Input>;
  'input-number': GetRCPropsType<typeof InputNumber>;
  switch: GetRCPropsType<typeof Switch>;
  'date-picker': GetRCPropsType<typeof DatePicker>;
  checkbox: GetRCPropsType<typeof Checkbox>;
  radio: GetRCPropsType<typeof Radio>;
  select: GetRCPropsType<typeof Select>;
  textarea: GetRCPropsType<typeof Input.TextArea>;
};

export interface MyFormItemProps<T extends ControlTypes = ControlTypes> extends Omit<FormItemProps, 'required'> {
  type?: T;
  options?: {
    label: string;
    value: any;
    disabled?: boolean;
  }[];
  innerProps?: InnerProps[T];
  required?: string | boolean;
}

export class ControlMap {
  props: MyFormItemProps;

  constructor(props: MyFormItemProps) {
    this.props = props;
  }

  get innerProps() {
    return this.props.innerProps as object;
  }

  input() {
    return <Input {...this.innerProps} />;
  }

  'input-number'() {
    return <InputNumber {...this.innerProps} style={{ width: '100%' }} />;
  }

  switch() {
    return <Switch {...this.innerProps} />;
  }

  'date-picker'() {
    const currentLocale = dayjs.locale();
    const isPersian = currentLocale === 'fa' || currentLocale === 'fa_IR';

    if (isPersian) {
      return <DatePickerJalali {...this.innerProps} style={{ width: '100%' }} />;
    }

    return <DatePicker {...this.innerProps} style={{ width: '100%' }} />;
  }

  checkbox() {
    // highlight-next-line
    return <Checkbox.Group children={this.props.children} options={this.props.options} {...this.innerProps} />;
  }

  radio() {
    // highlight-next-line
    return <Radio.Group children={this.props.children} options={this.props.options} {...this.innerProps} />;
  }

  select() {
    // highlight-next-line
    return <Select children={this.props.children} options={this.props.options} {...this.innerProps} />;
  }

  textarea() {
    return <Input.TextArea {...this.innerProps} />;
  }
}

const MyformItem: FC<MyFormItemProps> = props => {
  const { type, required, rules: userRules, innerProps, ...restProps } = props;

  const rules = useMemo(() => {
    if (userRules) return userRules;

    if (required) {
      if (typeof required === 'boolean') {
        return [{ required: true, message: `请输入${props.label}` }];
      } else if (typeof required === 'string') {
        return [{ required: true, message: required }];
      }
    }
  }, [required, userRules, props.label]);

  // highlight-next-line
  const controlMap = new ControlMap(props);

  return (
    <Form.Item {...restProps} rules={rules}>
      {type ? controlMap[type]() : props.children}
    </Form.Item>
  );
};

export default MyformItem;
