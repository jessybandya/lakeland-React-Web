import React, { useEffect, useState } from "react";
import Account from "../../Account";
import "./styles.css";
import BasicLayout from "../../../layouts/authentication/components/BasicLayout";
import SoftButton from "../../../soft-components/SoftButton";
import { auth, db } from "../../../firebase";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Form, Modal } from 'react-bootstrap';
import { Paper, Table, TableBody, TableCell, TableContainer, IconButton, TableRow, Slide } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const data = [
  ['Mpesa Paybill Number', '522533'],
  ['Account Number', '7643035'],
  ['Business Name', 'Lakeland Development Limited'],
];

function Profile() {
  const [currentUser, setCurrentUser] = useState()
  const [modalShow, setModalShow] = React.useState(false);
  const authId = useSelector((state) => state.authId);
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('')
  const vertical= "bottom"
  const horizontal= "center"

  const handleClick = (text) => {
    setOpen(true);
    setText(text)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      handleClick(`Copied: ${text}`)
    });
  };

  const requestAccountDelete = () =>{
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are about to delete your account. This action cannot be undone!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
      },
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection('users')
          .doc(authId)
          .update({ requestDelete: true })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Account Deletion Request',
              text: 'Your request has been sent to the admin and shall be reviewed within 24 hrs!',
              customClass: {
                container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
              },
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Account Deletion Request',
              text: 'Error during sending of your request. Please try again later!',
              customClass: {
                container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
              },
            });
          });
      }
    });
  }

  useEffect(() => {
    const unsub = auth?.onAuthStateChanged((user) => {
      db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
    });
  
    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []);

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image="https://media.istockphoto.com/id/637912692/photo/nairobi-cityscape-capital-city-of-kenya.jpg?s=612x612&w=0&k=20&c=S8wPNq9om-IMcapXFC030ew28nhpYCFYBStX5yxCQbs="
    >
      <div className="card user-card-full">
        <div className="row m-l-0 m-r-0">
          <div className="col-sm-4 user-profile">
            <div className="card-block text-center text-white">
              <div className="m-b-25">
                <img
                  src={currentUser?.profilePhoto}
                  style={{height:100, width:100, borderRadius:100/2, objectFit: 'cover'}}
                  alt={currentUser?.firstName}
                />
              </div>
              <h6 className="f-w-600">{currentUser?.firstName} {currentUser?.lastName}</h6>
              <p>{currentUser?.isApproved ? 'Active' : 'Inactive'}</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                
                  <SoftButton
                    style={{
                      background: "linear-gradient(310deg, #0000FF, #8A8AFF)",
                      marginTop: 5,
                      width:'100%'
                    }}
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                  <a href="https://lakelanddevelopment.org/page-8/" style={{color:'#fff'}} target="__blank">
                  Become a Member
                  </a>                    
                  </SoftButton>
                <SoftButton
                  style={{
                    background: "linear-gradient(310deg, #0000FF, #8A8AFF)",
                    marginTop: 5,
                  }}
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={() => setModalShow(true)}
                >
                  Pay for Membership
                </SoftButton>
              </div>
            </div>
          </div>
          <div className="bg-c-lite-green col-sm-8">
            <div className="card-block">
              <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
              <div className="row">
                <div className="col-sm-6">
                  <p className="m-b-10 f-w-600">First Name</p>
                  <h6 className="text-muted f-w-400">{currentUser?.firstName}</h6>
                </div>
                <div className="col-sm-6">
                  <p className="m-b-10 f-w-600">Last Name</p>
                  <h6 className="text-muted f-w-400">{currentUser?.lastName}</h6>
                </div>
              </div>
              <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
              </h6>
              <div className="row">
                <div className="col-sm-6">
                  <p className="m-b-10 f-w-600">Email</p>
                  <h6 className="text-muted f-w-400">{currentUser?.email}</h6>
                </div>
                <div className="col-sm-6">
                  <p className="m-b-10 f-w-600">Phone</p>
                  <h6 className="text-muted f-w-400">{currentUser?.phone}</h6>
                </div>
              </div>
              <SoftButton
              style={{
                marginTop:10,
              }}
              fullWidth
              onClick={requestAccountDelete}
            >
              Delete Account
            </SoftButton>
            </div>
          </div>
        </div>
      </div>


      <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      style={{
        zIndex:1500
      }}
      centered
    >
      <Modal.Header 
      style={{
        display:'flex',
        justifyContent:'space-between',
        background: 'linear-gradient(310deg, #0000FF, #8A8AFF)',
        color:'#fff'
      }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Make Payment
        </Modal.Title>
        <CloseIcon onClick={() => setModalShow(false)} fontSize="medium" style={{cursor:'pointer'}} />
      </Modal.Header>
      <Modal.Body
      style={{
        background: 'linear-gradient(310deg, #0000FF, #8A8AFF)',
        height:'auto',
        overflowY:'auto'
      }}
      >
      <TableContainer component={Paper}
      style={{
        background: 'linear-gradient(310deg, #0000FF, #8A8AFF)',
        height:'auto',
        overflowY:'auto',
        border:'1px solid #fff'
      }}
      >
      <Table>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell
              style={{
                color:'#fff',
                fontWeight:'bold'
              }}
              >{row[0]}</TableCell>
              <TableCell align="right"
              style={{
                color:'#E8E8E8',
              }}
              >
              {row[1]}
              <IconButton onClick={() => copyToClipboard(row[1])}>
              <ContentCopyIcon style={{color:'#D1D1D1'}}/>
            </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Modal.Body>
    </Modal>

    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
    anchorOrigin={{ vertical, horizontal }}
    TransitionComponent={SlideTransition}
    >
    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
      {text}
    </Alert>
  </Snackbar>
    </BasicLayout>
  );
}

export default Profile;
