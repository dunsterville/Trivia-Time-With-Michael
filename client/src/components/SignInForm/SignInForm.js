import React, { useContext } from 'react'
import './SignInForm.css'
import UserContext from '../../utils/Usercontext'


const SignInForm = _ => {
  
  const { email, password, loginError, handleInputChange, handleFormSubmit } = useContext(UserContext)

  const errorStyle = {
    border: 'solid 2px #FF647C'
  }

  const errorLabel = {
    marginTop: '4px',
    display: 'block',
    color: '#FF647C',
    textAlign: 'center'
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="formHeader">
          <h2>Sign In</h2>
          <p>Please enter your email and password</p>
        </div>

          <label>Email</label>
          <input style={loginError ? errorStyle : {border: '0'}} type="email" name="email" value={email} onChange={handleInputChange} placeholder="ex. johndoe@gmail.com" />

          <label>Password</label>
          <input style={loginError ? errorStyle : {border: '0'}} type="password" name="password" value={password} onChange={handleInputChange} placeholder="ex. password123" />

        <button type="submit" onClick={handleFormSubmit}>Login</button>
        <p style={loginError ? errorLabel : {display: 'none'}}>Login credentials incorrect</p>
        <br />
        <br />
        <div className="text-center colorSet">
          <p>Need an account?</p>
          <a className="bottomLink" href="/signup">Sign Up</a>
          <a href="/">Home</a>
        </div>
      </form>
    </div>
  )
}
export default SignInForm