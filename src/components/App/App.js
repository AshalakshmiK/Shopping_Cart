import React, { Suspense } from 'react';
import {Provider} from 'react-redux';
import { Route,  BrowserRouter as Router } from 'react-router-dom'

import './App.scss';
import Loader from'./Loader';
import ShoppingList from '../ShoppingList';
import store from '../../store.js'

const Cart=React.lazy(()=>import('../Cart'))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={ShoppingList} />
        <Suspense fallback={<Loader/>}>
        <Route path="/cart"  component={Cart} />
        </Suspense>
      </Router>
      
    </Provider>
  );
}

export default App;
