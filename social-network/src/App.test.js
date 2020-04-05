import React from 'react';
import App from './App';
import * as ReactDOM from "react-dom";
import {create} from 'react-test-renderer';

test('renders learn react link', () => {
  expect(()=>{create(<App/>)}).not.toThrow();
});
