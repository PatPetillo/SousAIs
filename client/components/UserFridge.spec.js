/* global describe beforeEach it */

import 'jsdom-global/register';
import React from 'react';
import enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { expect } from 'chai';
import { UserFridge } from './UserFridge';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('<UserFridge />', () => {
  let user;
  let fridge;
  let userFridgeWrapper;
  let spy;
  let onClick;
  let handleClick;
  beforeEach('Create <UserFridge /> wrapper', () => {
    user = { name: 'Pat' },
    fridge = [{
      name: 'Potato',
      image: 'thisIsAnImageOfAPotato.jpeg',
    }],
    userFridgeWrapper = shallow(<UserFridge user={user} fridge={fridge} handleClick={handleClick} componentDidMount={spy}/>);
  });

  it('has user props', () => {
    expect(userFridgeWrapper.instance().props.user).to.deep.equal({ name: 'Pat' });
  });

  it('has fridge props', () => {
    expect(userFridgeWrapper.instance().props.fridge[0]).to.deep.equal({
      name: 'Potato',
      image: 'thisIsAnImageOfAPotato.jpeg',
    });
  });

  it('properly displays user name in h2', () => {
    expect(userFridgeWrapper.find('h2').text()).to.be.equal(" Pat's Fridge ");
  });

  it('properly displays fridge item name in p', () => {
    expect(userFridgeWrapper.find('p').text()).to.be.equal('POTATO');
  });

  // it('handles a click action', () => {
  //   onClick = sinon.spy();
  //   userFridgeWrapper.find('button').simulate('click');
  //   expect(onClick).to.have.property('callCount', 1);
  // });

  // it('calls componentDidMount', () => {
  //   // const inst = userFridgeWrapper.instance()
  //   // inst.componentDidMount
  //   sinon.spy(userFridgeWrapper, 'componentDidMount');
  //   expect(userFridgeWrapper.componentDidMount).to.have.property('callCount', 1);
  //   // userFridgeWrapper.componentDidMount.restore();
  // });
});
