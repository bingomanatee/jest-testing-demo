import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

function setup(jsx) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  }
}

describe('App', () => {


  describe('Buyable test with Mocks', () => {
    afterEach(() => {
      cleanup();
    });
    let LocalApp;
    let itemsModule;
    beforeEach(async () => {
      await jest.mock('./items', () => {
        return ({
          items: [],
        });
      })
      itemsModule = await import('./items');
      const appModule = await import('./App');
      LocalApp = appModule.default;
    });

    it('should add a mans shirt to the items collection', async () => {
      const {container, user} = setup(<LocalApp/>);
      console.log('bwm - items module = ', itemsModule);
      const cartItems = container.querySelector('#cart-items');
      expect(cartItems.childNodes.length).toBe(0);

      const mensButton = container.querySelector(('#buyable-button-mens-shirt'));
      await user.click(mensButton);

      expect(cartItems.childNodes.length).toBe(1);
    });

    it('should add a womans shirt to the items collection', () => {
      const {container} = setup(<LocalApp/>);
      console.log('bwm - items module 2 = ', itemsModule);
      const cartItems = container.querySelector('#cart-items');
      expect(cartItems.childNodes.length).toBe(0);

      /**
       * now, because we are using a local array for items, it is
       * cleared with each test.
       */
    });
  })

})