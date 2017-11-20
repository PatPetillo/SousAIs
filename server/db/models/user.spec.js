/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');

const User = db.model('user');

describe('User model', () => {
  beforeEach(() => db.sync({ force: true }));

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let devon;

      beforeEach(() => User.create({
        name: 'devon',
        email: 'devon@gmail.com',
        password: 'javascriptisfun',
      })
        .then((user) => {
          devon = user;
        }));
        
      it('returns true if the password is correct', () => {
        expect(devon.correctPassword('javascriptisfun')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(devon.correctPassword('javascriptistoohard')).to.be.equal(false);
      });
    });
  });
});
