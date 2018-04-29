import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export default function WelcomeScreenCarousel() {
  return (
    <div className="carousel">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        showArrows={false}
      >
        <img className="carousel-img" src="/imgs/carousel-1.jpeg" alt="food" />
        <img className="carousel-img" src="imgs/carousel-2.jpeg" alt="food" />
        <img className="carousel-img" src="imgs/carousel-3.jpeg" alt="food" />
        <img className="carousel-img" src="imgs/carousel-4.jpeg" alt="food" />
      </Carousel>
    </div>
  );
}

