import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export default function WelcomeScreenCarousel() {
  return(
    <div className="carousel-container">
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={3000}>
      <div>
        <img  className="carousel-img" src ="https://static01.nyt.com/images/2016/12/08/dining/08COOKING-SPICY-PEANUT-STEW2/08COOKING-SPICY-PEANUT-STEW2-videoSixteenByNineJumbo1600.jpg" />
      </div>
      <div>
        <img  className="carousel-img" src ="https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/spaghetti-bolognese.jpg?itok=KzT6QRKe" />
      </div>
      <div>
        <img  className="carousel-img" src ="http://whatsgabycooking.com/wp-content/uploads/Fatoush.jpg" />
      </div>
    </Carousel>
    </div>
  )
}
