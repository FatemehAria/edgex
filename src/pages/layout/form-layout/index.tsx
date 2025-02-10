import type { MyFormOptions } from '@/components/core/form';
import type { FormLayout as AntdFormLayout } from 'antd/es/form/Form';

import { Button, Form } from 'antd';
import React from 'react';

import MyForm from '@/components/core/form';

function FormLayout({
  FormOptions,
  layoutDir,
  submitForm,
}: {
  FormOptions: MyFormOptions;
  layoutDir: AntdFormLayout;
  submitForm: (values?: any) => void;
}) {
  return (
    <div>
      <MyForm options={FormOptions} onFinish={() => submitForm()} layout={layoutDir} className="form-styling">
        <Form.Item className="btn-container">
          <Button type="primary" htmlType="submit" className="submit-button">
            ثبت
          </Button>
        </Form.Item>
      </MyForm>
    </div>
  );
}

export default FormLayout;
