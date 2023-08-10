import React, { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Soft UI Dashboard React components
import SoftBox from "../../../../soft-components/SoftBox";
import SoftTypography from "../../../../soft-components/SoftTypography";
import SoftAvatar from "../../../../soft-components/SoftAvatar";
// Soft UI Dashboard React base styles
import breakpoints from "../../../../assets/theme/base/breakpoints";
import SoftButton from "../../../../soft-components/SoftButton";
import { Button, Modal } from 'react-bootstrap'
import Learn from "./Learn";
import Create from "./Create";
import Sell from "./Sell";
import SchoolIcon from '@mui/icons-material/School';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Backdrop from '@mui/material/Backdrop';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import { MDBCardImage } from "mdb-react-ui-kit";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";


function Header({ firstName, lastName, profilePhoto, isApproved, wpBuilder, spBuilder }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [name, setName] = useState('')
  const [modalShow, setModalShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenMenu(false)
  };
  const handleOpen = () => {
    setOpen(true);
    setOpenMenu(true)
  };

  const openModal = (name) => {
    setModalShow(true)
    setName(name)
  }

  const closeModal = () => {
    setModalShow(false)
    handleOpen()
  }

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);
  
    // Enumerate number abbreviations
    var abbrev = [ "K", "M", "B", "T" ];
  
    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {
  
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);
  
        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;
  
             // Add the letter for the abbreviation
             number += abbrev[i];
  
             // We are done... stop
             break;
        }
    }
  
    return number;
  }


  const handleImageClick = () => {
    setIsOpen(true);
  };

  const handleLightboxClose = () => {
    setIsOpen(false);
  };

  return (
    <SoftBox position="relative">
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(https://images.pexels.com/photos/13348192/pexels-photo-13348192.jpeg?cs=srgb&dl=pexels-antony-trivet-13348192.jpg&fm=jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "20%",
          overflow: "hidden",
          zIndex: -1,
          marginTop: -2,
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center" style={{
          
        }}>
          <Grid>
          <MDBCardImage src={profilePhoto}
          onClick={handleImageClick}
          alt={firstName} style={{ width:70, height:70, borderRadius:10, cursor: 'pointer', objectFit: 'cover', marginLeft:10, marginTop:10 }} fluid />

          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {firstName} {lastName}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {isApproved ? 'Verified' : 'Unverified'}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid container justifyContent="flex-end" style={{
            marginTop:0,
            display:'flex',
            flexWrap:'wrap'
          }}>
          <SoftButton onClick={() => openModal('Learn')} style={{backgroundColor:'#2152ff',color:'#fff',marginRight:5,marginTop:5}} variant="gradient">
             Learn <SchoolIcon style={{marginLeft:5}} />
          </SoftButton>
          <SoftButton onClick={() => openModal('Create')} style={{backgroundColor:'#2152ff',color:'#fff',marginRight:5,marginTop:5}} variant="gradient">
           Create <CreateNewFolderIcon  style={{marginLeft:5}}/>
        </SoftButton>
        <SoftButton onClick={() => openModal('Sell')} style={{backgroundColor:'#2152ff',color:'#fff',marginRight:5,marginTop:5}} variant="gradient">
        Sell <StorefrontIcon  style={{marginLeft:5}}/>
      </SoftButton>
          </Grid>
        </Grid>
      </Card>


      <Modal
      show={modalShow}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      // centered
      style={{
        zIndex:1500
      }}
    >
      <Modal.Header style={{
        display:'flex',
        justifyContent:'space-between',
        background: 'linear-gradient(310deg, #FF3659, #FF647F)',
        color:'#fff'
      }}>
        <Modal.Title id="contained-modal-title-vcenter">
          {name}
        </Modal.Title>
        <CloseIcon onClick={closeModal} fontSize="medium" style={{cursor:'pointer'}} />
      </Modal.Header>
      <Modal.Body
      style={{
        background: 'linear-gradient(310deg, #FF3659, #FF647F)',
      }}
      >
      {name === 'Learn' ?(
        <Learn />
      ): name === 'Create' ?(
        <Create wpBuilder={wpBuilder} spBuilder={spBuilder}/>
      ):(
        <Sell />
      )}
      </Modal.Body>
    </Modal>

    {isOpen && (
      <Lightbox
      style={{zIndex: 9999}}
        mainSrc={profilePhoto}
        onCloseRequest={handleLightboxClose}
        imageCaption={`${firstName} ${lastName}`}
      />
    )}
    </SoftBox>
  );
}

export default Header;
