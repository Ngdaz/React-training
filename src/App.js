import React from 'react'
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';



import HomePage from './page/components/homepage.component'
import ShopPage from  './page/shop/shope.component'
import SignInAndSignUpPage from './page/sign-in-and-sign-up/sign-in-and-sign-up.component' 
import Header from './components/header/header.component'
import { auth } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
      super()

      this.state = {
        currentUser: null,
      }
  }

  unsubcribeFromAuth = null;

  componentDidMount() {
    this.unsubcribeFromAuth =auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})
      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth()
  }


  render(){
        return (
        <div>
          <Header  currentUser={this.state.currentUser}/>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/shop' component={ShopPage}/>
            <Route path='/signin' component={SignInAndSignUpPage}/> 
          </Switch>
        </div>
      );
  }
}

export default App;
