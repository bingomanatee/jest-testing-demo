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
    let items = [];
    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
      jest.restoreAllMocks();
      items = [];
    });
    let LocalApp;
    beforeEach(async () => {
      //console.log('jest: ', jest);
      await jest.mock('./items', () => {
        const ItemsManager = {
          foo: 'bar',

          Singleton: {
            getItems() {
              return items;
            },
            setItems(newItems) {
              items = [...newItems]
            }
          }
        };

        return ({
          ItemsManager
        });
      });

      const appModule = await import('./App');
      LocalApp = appModule.App;
    });

    it('should add a mans shirt to the items collection', async () => {
      const {container, user} = setup(<LocalApp/>);
      const cartItems = container.querySelector('#cart-items');
      expect(cartItems.childNodes.length).toBe(0);

      const mensButton = container.querySelector(('#buyable-button-mens-shirt'));
      await user.click(mensButton);

      expect(cartItems.childNodes.length).toBe(1);
    });

    it('should add a womans shirt to the items collection', () => {
      const {container} = setup(<LocalApp/>);
      const cartItems = container.querySelector('#cart-items');
      expect(cartItems.childNodes.length).toBe(0);

      /**
       * now, because we are using a local array for items, it is
       * cleared with each test.
       */
    });
  })

})