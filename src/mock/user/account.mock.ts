import ProfilePlaceholder from '@/assets/account/sample-pro-placeholder.png';

import { intercepter, mock } from '../config';

const mockAccountInfo = [
  {
    userId: Math.floor(Math.random()) * 100,
    avatar: ProfilePlaceholder,
    first_name: 'فاطمه',
    last_name: 'آریانی',
  },
];

mock.mock('/user/account', 'get', (config: any) => {
  const body = config?.body;

  console.log(body);

  return intercepter(mockAccountInfo);
});