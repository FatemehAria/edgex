import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function RedirectionButton({ linkAddress, btnText }: { linkAddress: string; btnText: string }) {
  return (
    <Link to={linkAddress} style={{ textDecoration: 'none' }}>
      <Button type="primary" style={{ margin: '1rem 0' }}>
        {btnText}
      </Button>
    </Link>
  );
}

export default RedirectionButton;
