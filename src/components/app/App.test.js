import {cleanup, render} from '@testing-library/react';
import {App} from './App';
import {timestamp} from "./timestamp";

const MOCKED_TIMESTAMP = '___ mock timestamp ___';

describe('App', () => {

  describe('snapshot', () => {
    describe('will fail', () => {
      beforeEach(() => {
        jest.mock('./timestamp', () => {
          return {timestamp: MOCKED_TIMESTAMP}
        })
      });

      afterEach(() => {
        cleanup();
      });
      
      it('should mock the timestamp', () => {
        expect(timestamp()).toBe(MOCKED_TIMESTAMP);
        /**
         *  why is this failing? Because the mock was applied
         *  after the module was imported at the top of the test.
        */
      });

      it('should render a snapshot of the store', () => {
        /**
         * App's downstream cart , <Cart /> should use the mocked timestamp function, right?
         * wrong!!!! if you look at its snapshot it integrates the base timestamp function
         * before your mocks overlay. 
         */
        const { baseElement } = render(<App />);
        expect(baseElement).toMatchSnapshot();
      })
    });
  });

})