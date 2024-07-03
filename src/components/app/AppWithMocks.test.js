import {clear} from "@testing-library/user-event/dist/clear";
import {cleanup, render} from "@testing-library/react";

describe('App', () => {
  describe('snapshot', () => {
    describe('will succeed', () => {
      let LocalApp;

      beforeEach(async () => {
        jest.mock('./timestamp', () => {
          return {timestamp: () => '___ mock timestamp ___'}
        });

        const appModule = await import('./App');
        LocalApp = appModule.default
        console.log('local app is ', LocalApp);
      });

      afterEach(() => {
        cleanup();
      });

      it('should render a snapshot of the store with mock date', () => {
        const { baseElement } = render(<LocalApp />);
        expect(baseElement).toMatchSnapshot();
      })
    })

  })

})