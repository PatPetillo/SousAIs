import React from 'react';
import { WelcomeScreenCarousel } from './';

const descriptions = [
  'Keeps track of the contents of your fridge',
  'Provides you with the nutritional info you need to make well informed choices',
  'Takes the guess work out of cooking',
];

const WelcomeScreen = () => (
  <div className="welcome-page">
    <div className="py-5 text-center banner">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 text-white">
            <h1 className="display-3 mb-4">Sous with <span className="red-words">Alexa</span></h1>
            <p className="lead mb-5" />
          </div>
        </div>
      </div>
    </div>

    <div className="motto bg-secondary"> <h1> Cooking - reinvented </h1> </div>

    <div className="carousel-info">
      <div className="carousel-container"> <WelcomeScreenCarousel /> </div>
      <div className="how-it-works bg-primary">
        <div className="all-descriptions">
          <h1 className="description-head"> Sous is your personal kitchen assistant </h1>
          <div className="descriptions">
            {
              descriptions.map(description => (
                <p className="lead" key={description}> {description} </p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WelcomeScreen;
