import type { MyFormOptions } from '@/components/core/form';
import type { FormLayout as AntdFormLayout } from 'antd/es/form/Form';

import { Button, Form } from 'antd';

import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';

function FormLayout({
  FormOptions,
  layoutDir,
  submitForm,
  isGrid,
}: {
  FormOptions: MyFormOptions;
  layoutDir: AntdFormLayout;
  submitForm: (values?: any) => void;
  isGrid: boolean;
}) {
  const { formatMessage } = useLocale();

  return (
    <div>
      <MyForm
        options={FormOptions}
        onFinish={values => submitForm(values)}
        layout={layoutDir}
        isGrid={isGrid}
        style={{ padding: '0 1rem' }}
      >
        <Form.Item className="btn-container">
          <Button type="primary" htmlType="submit" className="submit-button">
            {formatMessage({ id: 'gloabal.tips.submitBtn' })}
          </Button>
        </Form.Item>
      </MyForm>
    </div>
  );
}

export default FormLayout;
