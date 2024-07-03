import {cleanup, render} from "@testing-library/react";

describe('App', () => {

  describe('snapshot', () => {
    describe('will succeed', () => {
      afterEach(() => {
        cleanup();
      });
      let LocalApp;
      beforeEach(async () => {
        jest.mock('./timestamp', () => {
          return {timestamp: () => '___ mock timestamp ___'}
        });

        const appModule = await import('./App');
        LocalApp = appModule.default
      });
      it('should render a snapshot of the store with mock date', () => {
        const {baseElement} = render(<LocalApp/>);
        expect(baseElement).toMatchSnapshot();
      })
    })

  });

});