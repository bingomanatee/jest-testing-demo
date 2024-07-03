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

  describe('Buyable test', () => {
    afterEach(() => {
      cleanup();
    });
    let LocalApp;
    beforeEach(async () => {
      const appModule = await import('./App');
      LocalApp = appModule.default
    });

    it('should add a mans shirt to the items collection', async () => {
      const {user, container} = setup(<LocalApp/>);
      const cartItems = container.querySelector('#cart-items');
      expect(cartItems.childNodes.length).toBe(0);

      const mensButton = container.querySelector(('#buyable-button-mens-shirt'));
      await user.click(mensButton);

      expect(cartItems.childNodes.length).toBe(1);
    });
    it('should add a womans shirt to the items collection', () => {
      const context = render(<LocalApp/>);
      const cartItems = context.container.querySelector('#cart-items');
      expect(cartItems.childNodes.length).toBe(0);

      /*
      * This FAILS! why? we isolated the App -- but cart items is a singleton,
      * and the previous test added a man's shirt to it.
      * */
    });
  })

})