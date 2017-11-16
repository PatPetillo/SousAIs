import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const user = 'Devon';
const passWord = [{ Amazon: { account: 'user', passWord: 'skanthunt42' } },
  { faceBook: { account: 'FacebookUser', passWord: 'skanthunt42' } }];
const UserHome = () => (
  <div>
    <h1>{`Welcome to Your Dashboard, ${user}`}</h1>
    <br />
    {
        passWord.length && passWord.map(account => (
          <div>
            <p>{`${Object.keys(account)[0]}=${account[Object.keys(account)[0]].account}+${account[Object.keys(account)[0]].passWord}`}</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
          ))
      }
  </div>
);

export default UserHome;

