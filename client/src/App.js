import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// Pages
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import Game from './pages/Game'
import Standings from './pages/Standings'
import Admin from './pages/Admin'
// Api
import TTWMApi from './utils/TTWMApi'

const { authorize } = TTWMApi

const App = () => {

  //console.log(authorize(JSON.parse(sessionStorage.getItem('userInfo')).token))
  const isAuthenticated = sessionStorage.getItem('userInfo') ? authorize(JSON.parse(sessionStorage.getItem('userInfo')).token, JSON.parse(sessionStorage.getItem('userInfo')).email) : false
  const isAdmin = () => {
    if (sessionStorage.getItem('userInfo')) {
     authorize(JSON.parse(sessionStorage.getItem('userInfo')).token, JSON.parse(sessionStorage.getItem('userInfo')).email)
      .then(({data}) => {
        if (!data.admin) {
          return false
        } else {
          return true
        }
      })
    } else {
      return false
    }
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route extact path="/stamdings">
          <Standings />
        </Route>
        {
          isAuthenticated ?
          <>
            <Route exact path='/game'>
              <Game />
            </Route>
            {
              isAdmin ?
              <>
                <Route exact path='/admin'>
                  <Admin />
                </Route>
              </> : <Redirect to='/game' />
            }
          </> : <Redirect to='/signin' />
        }
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  )
}

export default App