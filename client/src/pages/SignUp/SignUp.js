import React, { useState, useEffect, useRef } from 'react'
import SignUpForm from '../../components/SignUpForm'
import UserContext from '../../utils/Usercontext'
import TTWMApi from '../../utils/TTWMApi'

const { registerUser, emailAvailable, authorize } = TTWMApi

const SignUp = _ => {

  const [ userState, userSetState ] = useState({
    email: '',
    password: '',
    formValid: true,
    sigCanvas: useRef(null),
    token: '',
    errors: {
      email: 'Email is required',
      sigCanvas: 'Signature is required',
      password: 'Password is required'
    }
  })

  userState.handleInputChange = e => {
    const { name, value } = e.target
    let errors = userState.errors
    const validEmailRegex = RegExp(/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/i)

    // Validation Switch
    switch (name) {
      case 'email': 
        errors.email = validEmailRegex.test(value) ? '' : 'Please use a valid email'
        break
      case 'password': 
        errors.password = value.length < 8 ? 'Password must be at least 8 characters' : ''
        break
      default:
        break
    }

    userSetState({...userState, errors, [e.target.name]: e.target.value})
  }

  userState.handleClearCanvas = e => {
    //e.preventDefault()
    console.log(e)
    userState.sigCanvas.current.clear()
  }

  userState.handleFormSubmit = e => {
    e.preventDefault()
    console.log('Form Submit')
    // Check if there's errors
    let valid = true
    userState.errors.sigCanvas = userState.sigCanvas.current.isEmpty() ? 'Please enter a signature' : ''
    Object.values(userState.errors).forEach( val => val.length > 0 && (valid = false))

    console.log(valid)
    // If no errors continue
    if (valid) {
      console.log('Valid')
      let errors = userState.errors

      // Check if email is available
      emailAvailable({email: userState.email})
        .then(({data}) => {
          console.log('Check email response')
          // Clear Email errors
          errors.email = ''
          userSetState({...userState, errors, formValid: true})
          // If username isn't taken create user
          registerUser({email: userState.email, avatar: userState.sigCanvas.current.toDataURL('image/png'), password: userState.password})
            .then(({data}) => {
              console.log('Register user response')
              userSetState({...userState, token: data.token})
              // Set User info in session storage
              sessionStorage.setItem('userInfo', JSON.stringify(data))
            })
            .catch(e => console.error(e))
          }
        )
        .catch(err => {
          console.log('Error: ' + err.response)
          if (err.response.status === 409) {
            errors.email = 'Email is already in use'
            userSetState({...userState, errors, formValid: false})
          }
      })    
    } else {
      userSetState({...userState, formValid: false})
    }
  }

  useEffect(() => {
    // Check if user is Authorized if token exists
    if (userState.token !== '') {
      authorize(userState.token, JSON.parse(sessionStorage.getItem('userInfo')).email)
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
      <SignUpForm />
    </UserContext.Provider>
  )
       
}
export default SignUp