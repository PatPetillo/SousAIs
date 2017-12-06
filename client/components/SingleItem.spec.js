import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SingleItem } from './SingleItem';
import { getSingleItemRecipeToStore, clearSingleItemRecipeFromStore } from '../store';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('SingleItem component', () => {
  let singleItem;
  let props;

  beforeEach(() => {
    singleItem = shallow(<SingleItem
      fridge={[{name: 'Apple', image: ''}]}
      match={{params: '1'}}
      recipe={{singleItemRecipes: [{name: 'Apple Sauce', image: ''}] }}
      getSingleItemRecipeToStore={getSingleItemRecipeToStore}
      clearSingleItemRecipeFromStore={clearSingleItemRecipeFromStore}
    />);

    props = singleItem.instance().props;
  });

  it('mounts', () => {
    expect(singleItem.find('.singleItem')).to.have.length(1);
  });

  it('has a fridge on its props', () => {
    expect(props.fridge).to.deep.equal([{ name: 'Apple', image: '' }]);
  });

  it('has a recipe object on its props', () => {
    expect(props.recipe.singleItemRecipes).to.deep.equal([{ name: 'Apple Sauce', image: '' }]);
  });
});
