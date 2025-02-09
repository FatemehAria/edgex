import type { FC } from 'react';

import './index.less';

import { useEffect, useState } from 'react';

const AccountPage: FC = () => {
  const [loading, setLoading] = useState(true);

  // mock timer to mimic Account data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div>Account</div>;
};

export default AccountPage;
