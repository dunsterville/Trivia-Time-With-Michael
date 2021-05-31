import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// Pages
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import Game from './pages/Game'
import Standings from './pages/Standings'
import Admin from './pages/Admin'
import Logout from './pages/Logout'
// Api
import TTWMApi from './utils/TTWMApi'

const { authorize } = TTWMApi

const App = () => {

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState({
    result: false,
    admin: false
  });

  // const asyncCall = () => {
  //   if (sessionStorage.getItem('userInfo')) {
  //     const result = await authorize(JSON.parse(sessionStorage.getItem('userInfo')).token, JSON.parse(sessionStorage.getItem('userInfo')).email)
  //       .then(({data}) => {
  //         setIsAuthenticated({...isAuthenticated, result: data.result, admin: data.admin })
  //       })
  //       .catch(err => console.log(err))
  //   }
  // }

  useEffect(() => {
      const fetchData = async () => {
        if (sessionStorage.getItem('userInfo')) {
          await authorize(JSON.parse(sessionStorage.getItem('userInfo')).token, JSON.parse(sessionStorage.getItem('userInfo')).email)
            .then(({data}) => {
              setIsAuthenticated({...isAuthenticated, result: data.result, admin: data.admin })
            })
            .catch(err => console.log(err))
        }
      };
      fetchData();
  }, []);


  //isAuthenticated()

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
        <Route extact path="/standings">
          <Standings />
        </Route>
        <Route extact path="/logout">
          <Logout />
        </Route>
        {
          isAuthenticated.admin ? (
            <>
              <Route exact path='/admin'>
                <Admin />
              </Route>
              <Route exact path='/game'>
                <Game />
              </Route>
            </>
          ) : isAuthenticated.result ? (
            <Route exact path='/game'>
              <Game />
            </Route>
          ) : loading ? (
            <div>LOADING...{setTimeout(()=>{setLoading(false)},1000)}</div>
          ) : <Redirect to='/signin' />
        }
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  )
}

export default App