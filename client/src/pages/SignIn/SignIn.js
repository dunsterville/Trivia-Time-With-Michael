import React, { useState, useEffect } from 'react'
import SignInForm from '../../components/SignInForm'
import UserContext from '../../utils/Usercontext'
import TTWMApi from '../../utils/TTWMApi'

const { loginUser, authorize } = TTWMApi


const SignIn = _ => {

  const [ userState, userSetState ] = useState({
    email: '',
    password: '',
    token: '',
    loginError: false,
  })

  userState.handleInputChange = e => {
    userSetState({...userState, [e.target.name]: e.target.value})
  }

  userState.handleFormSubmit = e => {
    e.preventDefault()

    loginUser({email: userState.email, password: userState.password})
      .then(({data}) => {
        if (!data) {
          userSetState({...userState, loginError: true})
        } else {
          userSetState({...userState, token: data.token })
          // Set User info in session storage
          sessionStorage.setItem('userInfo', JSON.stringify(data))
        }
      })
      .catch(e => {
        console.error(e)
      })
  }

  useEffect(() => {
    console.log('PLEASE FREAKING LOG SOMETHING')
    // Check if user is Authorized if token exists
    if (userState.token !== '') {
      console.log('test')
      authorize(userState.token, JSON.parse(sessionStorage.getItem('userInfo')).email)
        .then(res => {
          console.log(res)
          window.location.href = '/game'
        })
        .catch(err => {
          console.error(err)
        })
    } else if (sessionStorage.getItem('userInfo') ) {
      authorize(JSON.parse(sessionStorage.getItem('userInfo')).token, JSON.parse(sessionStorage.getItem('userInfo')).email)
        .then(res => {
          console.log(res)
          window.location.href = '/game'
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [userState.token])

  return (
    <UserContext.Provider value={userState}>
      <SignInForm />
    </UserContext.Provider>
  )
       
}
export default SignIn