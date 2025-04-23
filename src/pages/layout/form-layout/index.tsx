import type { MyFormOptions } from '@/components/core/form';
import type { FormLayout as AntdFormLayout } from 'antd/es/form/Form';

import { Button, Form } from 'antd';
import React from 'react';

import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';

function FormLayout({
  FormOptions,
  layoutDir,
  submitForm,
  isGrid,
  showButton,
  showCancelButton = false,
  form,
  children,
  onCancel,
}: {
  FormOptions: MyFormOptions;
  layoutDir: AntdFormLayout;
  submitForm: (values?: any) => void;
  isGrid: boolean;
  showButton?: boolean;
  showCancelButton?: boolean;
  form?: any;
  initialValues?: any;
  children?: React.ReactNode;
  onCancel?: () => void;
}) {
  const { formatMessage } = useLocale();

  return (
    <React.Fragment>
      <MyForm
        form={form}
        options={FormOptions}
        onFinish={values => submitForm(values)}
        layout={layoutDir}
        isGrid={isGrid}
        style={{ padding: '0 1rem' }}
      >
        {children}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: 'yellow',
          }}
        >
          <Form.Item>
            <Button
              type="default"
              htmlType="button"
              className="submit-button"
              style={{ display: showCancelButton ? 'inline' : 'none' }}
              onClick={onCancel}
            >
              {formatMessage({ id: 'gloabal.buttons.cancel' })}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="submit-button"
              style={{ display: showButton ? 'inline' : 'none' }}
            >
              {formatMessage({ id: 'gloabal.tips.submitBtn' })}
            </Button>
          </Form.Item>
        </div>
      </MyForm>
    </React.Fragment>
  );
}

export default FormLayout;
