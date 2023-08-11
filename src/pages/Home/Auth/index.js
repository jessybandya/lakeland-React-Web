import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './styles.css';
import SoftButton from '../../../soft-components/SoftButton';
import logo from '../../../logo.svg';
import { Link } from 'react-router-dom';
import BasicLayout from '../../../layouts/authentication/components/BasicLayout';

const Auth = () => {
  const gradientStyle = {
    background: 'linear-gradient(310deg, #0000FF, #8A8AFF)',
    WebkitBackgroundClip: 'text', // For Safari support
    WebkitTextFillColor: 'transparent', // For Safari support
    color: '#000', // Fallback color for non-supporting browsers
    fontWeight: 'bold',
    fontSize: '2rem',
    familyFont: 'Roboto',
  };





  return (
    <BasicLayout
    title="Welcome!"
    description="Use these awesome forms to login or create new account in your project for free."
    image="https://media.istockphoto.com/id/637912692/photo/nairobi-cityscape-capital-city-of-kenya.jpg?s=612x612&w=0&k=20&c=S8wPNq9om-IMcapXFC030ew28nhpYCFYBStX5yxCQbs="
  >
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="content"
      >
    <div style={gradientStyle}>
      <i>Welcome to Lakeland Development</i>
    </div>
    <section className="typewriter-section">
    <h2 className="typewriter-text">"Empowering Growth, Enriching Lives."</h2>
  </section>
  <section className="registration-section">
    <h2></h2>
    <p
    style={{cursor:'pointer', background: 'linear-gradient(310deg, #0000FF, #8A8AFF)',
    '-webkit-background-clip': 'text',
    color: 'transparent',
  }}
    >The organization provides technical assistance, training, and other resources to support projects that create jobs, stimulate economic growth, and improve quality of life.</p>
    <Link to='/register'>
    <SoftButton style={{background:'linear-gradient(310deg, #0000FF, #8A8AFF)'}} variant="gradient" color="info" fullWidth>
      Register
    </SoftButton>
    </Link>
  </section>
      </motion.section>

      </BasicLayout>
  );
};

export default Auth;
