import React from 'react';

export default function AlexaHelp() {
  return (
    <div>
      <div className="page-content">
        <h1 className="alexa-help-header"> SousAIs Alexa Instructions </h1>
        <div className="alexa-help-content-container">
          <ul>
            <li> To start using SousAIs, say "Alexa, Ask For Sous" and she will ask you for the food you have available </li>
            <li> To add an item to your fridge, for example chicken, say "Add chicken" and Sous will confirm the chicken is in your fridge</li>
            <li> To remove an item from your fridge, say "Remove chicken" and Sous will confirm the chicken was removed from your fridge </li>
            <li> If you would like recipes based on the food in your fridge, ask Sous "What recipes can I make?" </li>
            <li> When you're ready to start cooking, tell Sous "Let's start cooking" and she will tell you the first step of the recipe </li>
            <li> You can move through the steps of the recipe by saying "Next step" or "Let's keep going" </li>
            <li> If you want to hear the last step repeated, say "Say that again" </li>
            <li> To hear the recipe from the beginning, ask Sous "Can you start over" </li>
          </ul>
          <div className="video-container">
            <iframe title="SousAIs demo" src="https://www.youtube.com/embed/pcK-FI9s9X4?&loop=1&modestbranding=1" frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen />
          </div>
        </div>
      </div>
    </div>
  );
}
