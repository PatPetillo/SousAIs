/* global describe beforeEach it */

import 'jsdom-global/register';
import React from 'react';
import enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon, { stub } from 'sinon';
import { expect } from 'chai';
import { UserFridge } from './UserFridge';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('<UserFridge />', () => {
  let user;
  let fridge;
  let userFridgeWrapper;
  let handleClick;

  beforeEach('Create <UserFridge /> wrapper', () => {
    user = { name: 'Pat' },
    fridge = [{
      name: 'Potato',
      image: 'thisIsAnImageOfAPotato.jpeg',
    }],
    handleClick = sinon.stub();
    userFridgeWrapper = shallow(<UserFridge user={user} fridge={fridge} handleClick={handleClick}/>);
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

  it('properly displays fridge item image', () => {
    expect(userFridgeWrapper.find('img').filterWhere((item) => {
      return item.prop('src') === 'thisIsAnImageOfAPotato.jpeg';
    })).to.have.lengthOf(1);
  });
});
