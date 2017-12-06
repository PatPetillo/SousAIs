/* global describe beforeEach it */

// const { expect } = require('chai');
// const db = require('../index');

// const FridgeItems = db.model('fridgeItems');

// describe('FridgeItems model', () => {
//   beforeEach(() => db.sync({ force: true }));

//   it('has the expected schema definitions', () => {
//     expect(FridgeItems.attributes.name).to.be.an('object');
//   });

//   it('has the expected schema definition', () => {
//     expect(FridgeItems.attributes.image).to.be.an('object');
//   });

//   describe('instanceMethods', () => {
//     describe('correctCalories', () => {
//       let itemInFridge;

//       beforeEach(() => FridgeItems.create({
//         name: 'Potato',
//         image: 'https://ih1.redbubble.net/image.120730135.7037/flat,800x800,075,f.u1.jpg',
//       })
//         .then((fridgeItem) => {
//           itemInFridge = fridgeItem;
//         }));

//       it('expects name to be correct', () => {
//         expect(itemInFridge.name).to.be.equal('Potato');
//       });
//     });
//   });
// });
