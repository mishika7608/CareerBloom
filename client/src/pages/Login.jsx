import { Form , Link, redirect, useActionData, useNavigation } from 'react-router-dom';
import React from 'react';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {Logo, FormRow} from '../components';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const errors = { msg: ''};
  if (data.password.length < 5){
    errors.msg = 'password too short';
    return errors;
  }
  try{
    await customFetch.post('/v1/auth/login',data)
    return redirect('/dashboard');
  } catch(error){
    // errors.msg = error?.response?.data?.msg;
    console.log(error)
    return errors;
  }
  
}


const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'; 
  return (
    <Wrapper>
      <Form method='post'className='form'>
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{color:'red' }}>{errors.msg}</p>}
        <FormRow type="email" name="email" defaultValue='john@gmail.com'/>
        <FormRow type="password" name="password" defaultValue='secret123'/>
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting?'Submitting': 'Submit'}</button>
        <button type='submit' className='btn btn-block'>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>Register</Link>
        </p>
      </Form>
    </Wrapper>
  )
}
export default Login;