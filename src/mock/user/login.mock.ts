import type { LoginResult, Role } from '@/interface/user/login';

import FirstCarousel from '@/assets/login-carousel/beautiful-scenery-pathway-forest-with-trees-covered-with-frost.jpg';
import SecondCarousel from '@/assets/login-carousel/breathtaking-susnet-river-middle-green-forest-dark-sky.jpg';
import ThirdCarousel from '@/assets/login-carousel/idyllic-shot-huge-mountain-covered-vegetation-with-body-water-its-base.jpg';
import FourthCarousel from '@/assets/login-carousel/misurina-sunset.jpg';

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
  {
    id: 1,
    imgSrc: SecondCarousel,
  },
  {
    id: 2,
    imgSrc: ThirdCarousel,
  },
  {
    id: 3,
    imgSrc: FourthCarousel,
  },
];

mock.mock('/login-carousel', 'get', intercepter(mockCarouselList));
