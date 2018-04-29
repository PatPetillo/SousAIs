import React from 'react';
import { NavLink } from 'react-router-dom';
import { WelcomeScreenCarousel } from './';

const descriptions = [
  'Keeps track of the contents of your fridge',
  'Provides you with the nutritional info you need to make well informed choices',
  'Takes the guess work out of cooking',
];

const WelcomeScreen = () => (
  <div className="welcome-page">
    <div className="py-5 text-center banner mt-6 mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-white">
            <h1 className="display-3">Sous with <span className="red-words">Alexa</span></h1>
            <NavLink to="/alexaHelp">
              <div className="btn btn-primary m-2">Find Out More</div>
            </NavLink>
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
    <div className="source-code-link motto">
      <a href="https://github.com/PatPetillo/SousAIs"><h1>Sauce</h1></a>
    </div>
  </div>
);

export default WelcomeScreen;
