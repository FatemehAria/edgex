import type { ControlTypes, MyFormItemProps } from '../form-item';
import type { FormProps } from 'antd/es/form/Form';

import { Form } from 'antd';

import MyFormItem from '../form-item';

export interface MyFormOptions extends Array<MyFormItemProps<ControlTypes>> {}

export interface MyFormProps<T> extends FormProps<T> {
  options?: MyFormOptions;
}

const BaseForm = <Values extends object>(props: MyFormProps<Values>) => {
  const { options, children, ...rest } = props;

  return (
    <Form<Values> {...rest}>
      {options?.map((option, index) => {
        const key =
          option.name !== undefined
            ? Array.isArray(option.name)
              ? option.name.join('-')
              : option.name.toString()
            : index;

        return <MyFormItem {...option} key={key} />;
      })}
      {children}
    </Form>
  );
};

const MyForm = Object.assign(BaseForm, Form, { Item: MyFormItem });

export default MyForm;
