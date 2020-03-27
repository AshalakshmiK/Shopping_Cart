import React from 'react';
import {Provider} from 'react-redux';
import { Route,  BrowserRouter as Router } from 'react-router-dom'

import './App.scss';
import Cart from '../Cart';
import ShoppingList from '../ShoppingList';
import store from '../../store.js'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={ShoppingList} />
        <Route path="/cart"  component={Cart} />
      </Router>
      
    </Provider>
  );
}

export default App;
