// /* global describe beforeEach it */

// const { expect } = require('chai');
// const request = require('supertest');
// const db = require('../db');
// const app = require('../index');

// const User = db.model('user');

// describe('User routes', () => {
//   beforeEach(() => db.sync({ force: true }));

//   describe('/api/users/', () => {
//     const patsEmail = 'pat@gmail.com';

//     beforeEach(() => User.create({
//       name: 'pat',
//       email: patsEmail,
//     }));

//     it('GET /api/users', () => request(app)
//       .get('/api/users')
//       .expect(200)
//       .then((res) => {
//         expect(res.body).to.be.an('array');
//         expect(res.body[0].email).to.be.equal(patsEmail);
//       }));
//   });
// });
