import './login-carousel.css';

import { Carousel } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    getCarouselImages();
  }, []);

  const getRandomizedImages = () => {
    return [...imgs].sort(() => Math.random() - 0.5);
  };

  return (
    <Carousel autoplay fade dots={false} className="contentStyle" speed={3500}>
      {getRandomizedImages().map((item: { imgSrc: string; id: number }) => (
        <div key={item.id}>
          <img src={item.imgSrc} alt={`${item.id}`} className="carousel-img" />
        </div>
      ))}
    </Carousel>
  );
}

export default LoginCarousel;
