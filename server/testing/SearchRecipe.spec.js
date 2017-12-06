import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { SearchRecipe } from '../../client/components/SearchRecipe';

describe('Search Recipe Component', () => {
  let search;
  let getSearchRecipeSpy = spy()
  let info = {
    type: 'sandwich',
    cuisine: 'american',
    diet: 'vegetarian',
    exclude: 'mustard',
    intolerances: 'ketchup',
  };
  beforeEach(() => {
    search = shallow(<SearchRecipe getSearchRecipe={getSearchRecipeSpy} />);
  });

  it('has recipe prop', () => {
    search.instance().props.getSearchRecipe()
    expect(getSearchRecipeSpy.called).to.be.true;
  });

  it('has cuisine on its state', () => {
    expect(search.instance().state.cuisine).to.be.equal('')
  });

  it('has the proper state format', () => {
    search.instance().setState(info);
    expect(search.instance().state.cuisine).to.be.equal('american');
  });

});
