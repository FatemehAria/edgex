import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function RedirectionButton({
  linkAddress,
  btnText,
  display,
}: {
  linkAddress: string;
  btnText: string;
  display?: string;
}) {
  return (
    <Link to={linkAddress} style={{ textDecoration: 'none', display }}>
      <Button type="primary" style={{ margin: '1rem 0' }}>
        {btnText}
      </Button>
    </Link>
  );
}

export default RedirectionButton;
