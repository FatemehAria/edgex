import './login-carousel.css';

import { Carousel } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import LoginBg from '../../assets/login-carousel/beautiful-scenery-pathway-forest-with-trees-covered-with-frost.jpg';

function LoginCarousel() {
  const [imgs, setImgs] = useState<any[]>([]);

  const getCarouselImages = async () => {
    try {
      const { data } = await axios.get('/login-carousel');

      console.log(data);

      setImgs(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getCarouselImages();
  // }, []);

  const getRandomizedImages = () => {
    return [...imgs].sort(() => Math.random() - 0.5);
  };

  return (
    // <Carousel autoplay fade dots={false} className="contentStyle" speed={3500}>
    //   {getRandomizedImages().map((item: { imgSrc: string; id: number }) => (
    <div>
      <img src={LoginBg} className="carousel-img" />
    </div>
    //   ))}
    // </Carousel>
  );
}

export default LoginCarousel;
