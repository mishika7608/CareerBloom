import React from 'react'
import styled from "styled-components";
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';

const Landing = () => {
  return ( 
  <Wrapper>
    <nav>
      <Logo />
    </nav>
    <div className='container page'>
      <div className='info'>
        <h1>
          job <span>tracking</span> app
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum officia aperiam officiis est consectetur libero quaerat, deserunt eius odio! Unde harum facere soluta, quam eaque dignissimos velit fugit. Commodi, laudantium.
        </p>
        <Link to="/register" className='btn register-link'>Register</Link>
        <Link to="/login" className='btn '>Login /Demo User</Link>
      </div>
      <img src={main} alt="Job Hunt" className='img main-img'></img>
    </div>
  </Wrapper>
  );
};


export default Landing;