import React, { useState } from 'react';
import './styles.css'
import SoftButton from '../../../soft-components/SoftButton';
import UseWhatsapp from 'whatsapp-react-component';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { db } from '../../../firebase';

const Contact = ({setModalShowContact}) => {
    const [fullName, setFullName] = useState('')
    const [senderEmail, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const submitToAdmin = () => {
      setLoading(true);
      if (fullName === '' || senderEmail === '' || phone === '' || message === '') {
        toast.error('Please fill all fields!', {
          position: toast.POSITION.TOP_CENTER
        });
        setLoading(false);
        return;
      } else {
        const confirmDetails = async () => {
          const result = await Swal.fire({
            title: 'Confirm your details',
            html: `Name: ${fullName}<br/>
                   Phone Number: ${phone}<br/>
                   Email: ${senderEmail}<br/><br/>
                   Message: ${message}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
              container: 'my-swal-container', // Add a custom CSS class name
            },
          });
  
          if (result.isConfirmed) {
                setLoading(true);
                sendEmail()
                  Swal.fire({
                    icon: 'success',
                    title: 'Message sent successfully!',
                    text: 'We will get back to you shortly either via phone or email. Thank you!',
                  })
                    setLoading(false);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                    setModalShowContact(false);
          } else {
            setLoading(false);
          }
        };
  
        confirmDetails();
      }
    };


    const sendEmail = () => {
      const email = 'Info@lakelanddevelopment.org'; // Replace with the email address you want to send the email to
      const subject = 'Contact Form Submission';
      const body = `Dear Lakeland Admin,\n\n${message}\n\nBest regards,\n${fullName}\n${senderEmail}\n${phone}`;
  
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      window.open(mailtoLink, '_blank');
    };

  return (
    <section className="mb-4">
        <div className="row">
          {/*Grid column*/}
          <div className="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form" action="mail.php" method="POST">
              {/*Grid row*/}
              <div className="row">
                {/*Grid column*/}
                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <input type="text" id="name" name="name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="form-control" />
                    <label htmlFor="name" className>Full Name</label>
                  </div>
                </div>
                {/*Grid column*/}
                {/*Grid column*/}
                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <input type="text" id="email" name="email"
                    value={senderEmail}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control" />
                    <label htmlFor="email" className>Your email</label>
                  </div>
                </div>
                {/*Grid column*/}
              </div>
              {/*Grid row*/}
              {/*Grid row*/}
              <div className="row">
                <div className="col-md-12">
                  <div className="md-form mb-0">
                    <input type="text" id="subject"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    name="subject" className="form-control" />
                    <label htmlFor="subject" className>Phone</label>
                  </div>
                </div>
              </div>
              {/*Grid row*/}
              {/*Grid row*/}
              <div className="row">
                {/*Grid column*/}
                <div className="col-md-12">
                  <div className="md-form">
                    <textarea type="text" id="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    name="message" rows={2} className="form-control md-textarea" defaultValue={""} />
                    <label htmlFor="message">Your message</label>
                  </div>
                </div>
              </div>
              {/*Grid row*/}
            </form>
            <div style={{marginTop:10}} className="text-center text-md-left">
            <SoftButton style={{background:'linear-gradient(310deg, #FF3659, #FF647F)'}}  variant="gradient" color="info" fullWidth                     onClick={submitToAdmin}
            >
            {loading ? (
              <span>Submitting...</span>
            ):(
            <span>Submit</span>
            )}
            </SoftButton>
            </div>
            <div className="status" />
          </div>
          {/*Grid column*/}
          {/*Grid column*/}
          <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
              <li><i style={{cursor:'pointer', background: 'linear-gradient(310deg, #FF3659, #FF647F)',
              '-webkit-background-clip': 'text',
              color: 'transparent',
            }} className="fas fa-map-marker-alt fa-2x" />
                <p>Oginga Odinga street, Kisumu City, NYanza, Kenya</p>
              </li>
              <li><i className="fas fa-phone mt-4 fa-2x" 
              style={{cursor:'pointer', background: 'linear-gradient(310deg, #FF3659, #FF647F)',
              '-webkit-background-clip': 'text',
              color: 'transparent',
            }}
              />
                <p><a style={{color:'#000', fontWeight:'bold'}} href='tel:+254799314129'>+254799314129</a></p>
              </li>
              <li><i className="fas fa-envelope mt-4 fa-2x" 
              style={{cursor:'pointer', background: 'linear-gradient(310deg, #FF3659, #FF647F)',
              '-webkit-background-clip': 'text',
              color: 'transparent',
            }}
              />
                <a style={{color:'#000', fontWeight:'bold'}} href='mailto:Info@lakelandevelopent.org'>Info@lakelanddevepment.org</a>
              </li>
            </ul>
          </div>
          {/*Grid column*/}
        </div>
      </section>
  );
};

export default Contact;
