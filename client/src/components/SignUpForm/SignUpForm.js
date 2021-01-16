import React, { useContext, useState }  from 'react'
import { useForm } from 'react-hook-form'
import SignatureCanvas from 'react-signature-canvas'
import UserContext from '../../utils/Usercontext'

const SignUpForm = _ => {
  const { register, handleSubmit, errors } = useForm()


  const [ userState, userSetState ] = useState({
    trimmedDataURL: null
  })
  

  //const { username,  password, handleOnSubmit } = useContext(UserContext)
  const onSubmit = data => console.log(data, userState.sigCanvas.getTrimmedCanvas().toDataURL('image/svg+xml'))

  return (
    <div>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
        <input name="username" ref={register({ required: true, minLength: 4 })} />
        {errors.username && TypeError==="required" && <span>This field is required</span>}
        {errors.username && TypeError==="minLength" && <span>Username must be at least 4 characters</span>}
        
        <SignatureCanvas canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} ref={(ref) => { userState.sigCanvas = ref }} />

        {/* include validation with required or other standard HTML validation rules */}
        <input name="password" ref={register({ required: true , minLength: 8})} />
        {/* errors will return when field validation fails  */}
        {errors.password && TypeError==="required" && <span>This field is required</span>}
        {errors.password && TypeError==="minLength" && <span>Password must be at least 8 characters</span>}
        
        <input type="submit" />
      </form>
    </div>
  )
}

export default SignUpForm