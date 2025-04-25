import type { LoginResult, Role } from '@/interface/user/login';

import FirstCarousel from '@/assets/login-carousel/login-bg3.jpg';

import { intercepter, mock } from '../config';

mock.mock('/user/login', 'post', (config: any) => {
  const body: LoginResult = JSON.parse(config?.body);

  return intercepter<LoginResult>({
    token: '123abcdefg',
    username: body?.username,
    role: body?.username as Role,
  });
});

const mockCarouselList = [
  {
    id: 0,
    imgSrc: FirstCarousel,
  },
];

mock.mock('/login-carousel', 'get', intercepter(mockCarouselList));
