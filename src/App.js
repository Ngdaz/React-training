import React from 'react'
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';



import HomePage from './page/components/homepage.component'
import ShopPage from  './page/shop/shope.component'
import Header from './components/header/header.component'


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
      </Switch>
    </div>
  );
}

export default App;
