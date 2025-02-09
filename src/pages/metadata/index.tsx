import type { FC } from 'react';

import { Typography } from 'antd';

import { LocaleFormatter } from '@/locales';

const { Title, Paragraph } = Typography;

const MetadataPage: FC = () => {
  return (
    <div>
      <Typography className="innerText">
        <Title>
          <LocaleFormatter id="app.metadata.introduction.title" />
        </Title>
        <Paragraph>
          <LocaleFormatter id="app.metadata.introduction.description" />
        </Paragraph>
      </Typography>
    </div>
  );
};

export default MetadataPage;
