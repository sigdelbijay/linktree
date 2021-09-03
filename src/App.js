import {useEffect} from 'react'
import 'antd/dist/antd.css'
import { Switch, Route, withRouter } from 'react-router-dom'
import firebase from './firebase'

import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       window.localStorage.setItem('loggedIn', true)
  //     }
  //   })
  // }, [])
    
  return (
    <>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/' exact component={Home}/>
          <Route path='/profile/:username' exact component={Profile}/>
          
        </Switch>
    </>
  )
}

export default withRouter(App);