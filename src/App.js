import React from 'react'
import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';



import HomePage from './page/components/homepage.component'
import ShopPage from  './page/shop/shope.component'
import SignInAndSignUpPage from './page/sign-in-and-sign-up/sign-in-and-sign-up.component' 
import Header from './components/header/header.component'
import { auth,createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.action'


class App extends React.Component {

  setCurrentUser = this.props 

  unsubcribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubcribeFromAuth =auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
        
              setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
        }) 
        
      }else{
          setCurrentUser(userAuth)
      }
      
    })
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth()
  }


  render(){
        return (
        <div>
          <Header/>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/shop' component={ShopPage}/>
            <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='./'/>) : (<SignInAndSignUpPage/>) } />
          </Switch>
        </div>
      );
  }
}

const mapStateToProps = ({ user }) => ({
   currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps ,
  mapDispatchToProps, 
    ) (App);
