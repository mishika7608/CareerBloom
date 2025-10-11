import React from 'react'
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {

  const error = useRouteError();
  console.log(error.status || error);
  if (error.status === 404){
    return (
      <Wrapper>
        <div>
          <img src={img} alt='not found' />
          <h3>Ohh! Page Not Found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to='/dashboard'>back home</Link>
        </div>
      </Wrapper>
    );
  }
  else{
    return (
      <Wrapper>
        <div>
          <h3>Something Went Wrong</h3>
        </div>
      </Wrapper>
    );
  }
  
}
export default Error;