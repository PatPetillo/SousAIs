import { expect } from 'chai';

import { getItems, addItem, remove } from './fridge';
import reducer from './fridge';

import { createStore } from 'redux';

describe('Actions in Fridge', () => {
  describe('getItem action creator should returns the right action', () => {
    it('items to be the array we pass in', () => {
      const fridge = ['apple', 'banana', 'catcus'];
      expect(getItems(fridge)).to.be.deep.equal({
        type: 'GET_USER_ITEMS',
        items: fridge,
      });
    });
  });

  describe('addItem action creator should returns the right action', () => {
    it('item to be the item we pass in', () => {
      const item = 'apple';
      expect(addItem(item)).to.be.deep.equal({
        type: 'ADD_ITEM_TO_FRIDGE',
        item,
      });
    });
  });

  describe('remove action creator should returns the right action', () => {
    it('itemId to be the itemId we pass in', () => {
      const itemId = 1;
      expect(remove(itemId)).to.be.deep.equal({
        type: 'REMOVE_FRIDGE_ITEM',
        itemId,
      });
    });
  });
});

describe('Reducer', () => {
  let testStore;
  beforeEach('make mock store', () => {
    testStore = createStore(reducer);
  });
  it('has proper initial state', () => {
    expect(testStore.getState()).to.be.deep.equal([]);
  });
  describe('Add item', () => {
    it('can add single item', () => {
      testStore.dispatch(addItem({ id: 1, name: 'apple' }));
      const newState = testStore.getState();
      expect(newState).to.be.deep.equal([{ id: 1, name: 'apple' }]);
    });
    it('can add multiple items', () => {
      testStore.dispatch(addItem({ id: 1, name: 'apple' }));
      testStore.dispatch(addItem({ id: 2, name: 'banana' }));
      testStore.dispatch(addItem({ id: 3, name: 'catcus' }));
      const newState = testStore.getState();
      expect(newState).to.be.deep.equal([{ id: 1, name: 'apple' }, { id: 2, name: 'banana' }, { id: 3, name: 'catcus' }]);
    });
  });
  describe('Remove item', () => {
    it('can remove single item', () => {
      testStore.dispatch(addItem({ id: 1, name: 'apple' }));
      testStore.dispatch(addItem({ id: 2, name: 'banana' }));
      testStore.dispatch(addItem({ id: 3, name: 'catcus' }));
      testStore.dispatch(remove(1));
      const newState = testStore.getState();
      expect(newState).to.be.deep.equal([{ id: 2, name: 'banana' }, { id: 3, name: 'catcus' }]);
    });
    it('can remove multiple item', () => {
      testStore.dispatch(addItem({ id: 1, name: 'apple' }));
      testStore.dispatch(addItem({ id: 2, name: 'banana' }));
      testStore.dispatch(addItem({ id: 3, name: 'catcus' }));
      testStore.dispatch(remove(1));
      testStore.dispatch(remove(2));
      const newState = testStore.getState();
      expect(newState).to.be.deep.equal([{ id: 3, name: 'catcus' }]);
    });
  });
});

