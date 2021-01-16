import React, { useContext }  from "react"
import { useForm } from "react-hook-form"
import UserContext from '../../utils/Usercontext'

const SignUpForm = _ => {
  const { register, handleSubmit, watch, errors } = useForm()
  //const { username,  password, handleOnSubmit } = useContext(UserContext)
  const onSubmit = data => console.log(data)

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
        <input name="username" ref={register({ required: true })} />
        {errors.username && <span>This field is required</span>}
        
        {/* include validation with required or other standard HTML validation rules */}
        <input name="password" ref={register({ required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}
        
        <input type="submit" />
      </form>
    </div>
  )
}

export default SignUpForm