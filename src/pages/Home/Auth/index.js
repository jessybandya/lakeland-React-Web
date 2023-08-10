import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './styles.css';
import SoftButton from '../../../soft-components/SoftButton';
import logo from '../../../logo.svg';
import { Link } from 'react-router-dom';
import BasicLayout from '../../../layouts/authentication/components/BasicLayout';

const Auth = () => {
  const [text, setText] = useState('');
  const phrases = ['Welcome to Lakeland Web Training', 'Learn Web Development', 'Build Amazing Websites'];
  const gradientStyle = {
    background: 'linear-gradient(310deg, #FF3659, #FF647F)',
    WebkitBackgroundClip: 'text', // For Safari support
    WebkitTextFillColor: 'transparent', // For Safari support
    color: '#000', // Fallback color for non-supporting browsers
    fontWeight: 'bold',
    fontSize: '2rem',
    familyFont: 'Roboto',
  };

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let delay = 200;

    const type = () => {
      const currentPhrase = phrases[currentIndex % phrases.length];
      if (!isDeleting && currentText === currentPhrase) {
        isDeleting = true;
        delay = 1000;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex++;
        delay = 200;
      }

      if (isDeleting) {
        currentText = currentPhrase.substring(0, currentText.length - 1);
      } else {
        currentText = currentPhrase.substring(0, currentText.length + 1);
      }

      setText(currentText);
      setTimeout(type, delay);
    };

    type();
  }, []);



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
      <i>Lakeland Development</i>
    </div>
    <section className="typewriter-section">
    <h2 className="typewriter-text">{text}</h2>
  </section>
  <section className="registration-section">
    <h2></h2>
    <p
    style={{cursor:'pointer', background: 'linear-gradient(310deg, #FF3659, #FF647F)',
    '-webkit-background-clip': 'text',
    color: 'transparent',
  }}
    >Join us to learn web development and build amazing websites.</p>
    <Link to='/register'>
    <SoftButton style={{background:'linear-gradient(310deg, #FF3659, #FF647F)'}} variant="gradient" color="info" fullWidth>
      Register
    </SoftButton>
    </Link>
  </section>
      </motion.section>

      </BasicLayout>
  );
};

export default Auth;
