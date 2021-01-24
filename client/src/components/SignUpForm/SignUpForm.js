import React, { useContext } from 'react'
import './SignUpForm.css'
import SignatureCanvas from 'react-signature-canvas'
import UserContext from '../../utils/Usercontext'

const SignUpForm = _ => {

  const { email, sigCanvas, password, errors, formValid, handleInputChange, handleFormSubmit, handleClearCanvas } = useContext(UserContext)

  const errorStyle = {
    border: 'solid 2px #FF647C'
  }
  
  const errorLabel = {
    display: 'block',
    color: '#FF647C',
    fontSize: '12px'
  }

  //const onSubmit = data => console.log(data, userState.sigCanvas.getTrimmedCanvas().toDataURL('image/svg+xml'))

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="formHeader">
          <h2>Sign Up</h2>
          <p>Please enter your information below</p>
        </div>

          <label>Email</label>
          <input style={(!formValid && errors.email) ? errorStyle : {border: '0'}} type="email" name="email" value={email} onChange={handleInputChange} placeholder="ex. johndoe@gmail.com" />
          <p style={(!formValid && errors.email) ? errorLabel : {display: 'none'}}>{errors.email}</p>

          <label>Signature (this is Jeopardy you know)</label>
          <div className="sigCanvas-container" style={(!formValid && errors.sigCanvas) ? errorStyle : {border: '0'}}>
            <SignatureCanvas  canvasProps={{width: 'auto', height: 'auto', className: 'sigCanvas'}} ref={sigCanvas} />
          </div>
          <p style={(!formValid && errors.sigCanvas) ? errorLabel : {display: 'none'}}>{errors.sigCanvas}</p>
          <button type="button" className="clearCanvas" onClick={handleClearCanvas}>Clear Signature</button>

          <label>Password</label>
          <input style={(!formValid && errors.password) ? errorStyle : {border: '0'}} type="password" name="password" value={password} onChange={handleInputChange} placeholder="ex. password123" />
          <p style={(!formValid && errors.password) ? errorLabel : {display: 'none'}}>{errors.password}</p>

        <button type="submit" onClick={handleFormSubmit}>Create Account</button>
        <br />
        <br />
        <div className="text-center colorSet">
          <p>Already Have an Account?</p>
          <a className="bottomLink" href="/signin">Sign In</a>
          <a href="/">Home</a>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
