import React from 'react'
import './App.css';

import { Route, Switch } from 'react-router-dom';



import HomePage from './page/components/homepage.component'
import ShopPage from  './page/shop/shope.component'
import SignInAndSignUpPage from './page/sign-in-and-sign-up/sign-in-and-sign-up.component' 
import Header from './components/header/header.component'
import { auth,createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
      super()

      this.state = {
        currentUser: null,
      }
  }

  unsubcribeFromAuth = null;

  componentDidMount() {
    this.unsubcribeFromAuth =auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
        
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log(this.state)
        }) 
        
      }else{
        this.setState({currentUser: userAuth})
      }
      
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
