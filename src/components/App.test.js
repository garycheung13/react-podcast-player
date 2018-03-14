import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import App from './App';

const store = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    , div);
});
