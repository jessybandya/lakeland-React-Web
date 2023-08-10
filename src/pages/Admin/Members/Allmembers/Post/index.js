import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Avatar, Button, ImageListItem } from "@mui/material";
import { MDBCardImage } from "mdb-react-ui-kit";
import moment from "moment";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import { db } from "../../../../../firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { Modal } from 'react-bootstrap';
import Create from "./Create";
import Sell from "./Sell";

function Post({
  userId,
  firstName,
  lastName,
  email,
  phone,
  profilePhoto,
  timestamp,
  institution,
  diviworks,
  mcworks,
  pWorks,
  requestDelete,
  spBuilder,
  wpBuilder,
  isApproved
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [name, setName] = useState('')
  const [modalShow, setModalShow] = React.useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const handleLightboxClose = () => {
    setIsOpen(false);
  };
  var d = timestamp;
  //var d =val.timestamp;

  //NB: use + before variable name
  var date = new Date(+d);

  const verifyApproval = () => {
    handleOpenBackdrop()
     
    db.collection('users').doc(userId).update({
      isApproved:true
    })
    .then(()=>{
      toast.success(`${firstName} ${lastName} is now verified`,{
        position:'top-center'
      })
      handleCloseBackdrop()
    })
    .catch((err)=>{
      toast.error(`Failed to verify ${firstName} ${lastName}`,{
        position:'top-center'
      })
      handleCloseBackdrop()
    })
}
  const unVerifyApproval = () => {
    handleOpenBackdrop()
     
    db.collection('users').doc(userId).update({
      isApproved:false
    })
    .then(()=>{
      toast.success(`${firstName} ${lastName} is now activated`,{
        position:'top-center'
      })
      handleCloseBackdrop()
    })
    .catch((err)=>{
      toast.error(`Failed to activate ${firstName} ${lastName}`,{
        position:'top-center'
      })
      handleCloseBackdrop()
    })
  }

  const openModal = (name) => {
    setName(name)
    setModalShow(true)
  }

  const deleteUser = () =>{
    if(requestDelete === false){
      toast.error('This user has not requested for deletion',{
        position:'top-center'
      })
    }else{
    // Show a confirmation dialog before deleting the user
    const confirmed = window.confirm(`Are you sure you want to delete ${firstName} ${lastName}?\nIf Yes kindly go to your firebase console and delete the user "${email}" from the authentication section first by searching...!`);
    if (confirmed) {
      // User confirmed the deletion, proceed with the delete operation
      handleOpenBackdrop(); // Show the backdrop or loading spinner if needed

      // Perform the user deletion from Firestore
      db.collection('users')
        .doc(userId)
        .delete()
        .then(() => {
          toast.success(`${firstName} ${lastName} has been deleted`, {
            position: 'top-center',
          });
          handleCloseBackdrop(); // Close the backdrop or loading spinner if needed
        })
        .catch((err) => {
          toast.error(`Failed to delete ${firstName} ${lastName}`, {
            position: 'top-center',
          });
          handleCloseBackdrop(); // Close the backdrop or loading spinner if needed
        });
    }
    }
  }
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <MDBCardImage
          src={profilePhoto}
          alt={firstName}
          onClick={handleImageClick}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            cursor: "pointer",
            objectFit: "cover",
          }}
          fluid
        />
      </TableCell>
      <TableCell align="right">{firstName}</TableCell>
      <TableCell align="right">{lastName}</TableCell>
      <TableCell align="right">{email}</TableCell>
      <TableCell align="right">{phone}</TableCell>
      <TableCell align="right">
        {isApproved === true ? (
          <span style={{
            color:'#00D100',
            fontWeight:'bold',
            fontSize:15,
            padding:5,
            backgroundColor:'#D1D1D1',
            borderRadius:8,
            cursor:'pointer'
          }}
          onClick={unVerifyApproval}
          >active</span>
        ):(
           <span
           style={{
              color:'#FF5C5C',
              fontWeight:'bold',
              fontSize:15,
              padding:5,
              backgroundColor:'#D1D1D1',
              borderRadius:8,
              cursor:'pointer'
           }}
           onClick={verifyApproval}
           >inactive</span>
        )}
      </TableCell>
      <TableCell align="right">{
        requestDelete === true ? (<span><CheckCircleOutlineIcon fontSize="medium" style={{color:'#FF647F'}}/></span>):(<span><ClearIcon fontSize="medium" style={{color:'#FF647F'}}/></span>)
      }</TableCell>
      <TableCell align="right">{date.toDateString()}</TableCell>
      <TableCell align="right"><DeleteForeverIcon fontSize="medium" onClick={deleteUser}  style={{color:'#FF647F',cursor:'pointer'}}/></TableCell>

      {isOpen && (
        <Lightbox
        style={{zIndex: 9999}}
          mainSrc={profilePhoto}
          onCloseRequest={handleLightboxClose}
          imageCaption={`${firstName} ${lastName}`}
        />
      )}

      <Backdrop
      sx={{ color: '#fff', zIndex: 1502 }}
      open={openBackdrop}
      onClick={handleCloseBackdrop}
    >
      Processing...<CircularProgress color="inherit" />
    </Backdrop>

    </TableRow>
  );
}

export default Post;
