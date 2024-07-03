import {cleanup, render} from '@testing-library/react';
import App from './App';

describe('App', () => {

  describe('snapshot', () => {
    describe('will fail', () => {
      beforeEach(() => {
        jest.mock('./timestamp', () => {
          return {timestamp: '___ mock timestamp ___'}
        })
      });

      afterEach(() => {
        cleanup();
      })

      it.skip('should render a snapshot of the store', () => {
        const { baseElement } = render(<App />);
        expect(baseElement).toMatchSnapshot();
      })
    });
  });

})