/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";
import React from 'react'
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// Soft UI Dashboard React components
import SoftBox from "../../../../soft-components/SoftBox";
import SoftTypography from "../../../../soft-components/SoftTypography";
import StarIcon from '@mui/icons-material/Star';
import { Rating } from "@mui/material";
import { Modal } from 'react-bootstrap';
import Pratings from "./Pratings";
import Diviratings from "./Diviratings";
import Mcratings from "./Mcratings";
import { useSelector } from "react-redux";


function ProfileInfoCard2({ title, description, action, pRate, McRate, dVRate, pTotal, McTotal, dVTotal, pWorks, diviworks, mcworks, isApproved }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [name, setName] = React.useState('');
    const authId = useSelector(state => state.authId);

    const openModal = (name) => {
      setModalShow(true);
      setName(name)
    }
 
  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        <SoftTypography component={Link} to={action.route} variant="body2" color="secondary">

        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox mb={2} lineHeight={1}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            {description}
          </SoftTypography>
        </SoftBox>
        <SoftBox opacity={0.3}>
          <Divider />
        </SoftBox>
        <SoftBox>
        <div>
        <SoftBox style={{
          alignItems: "center"
        }}  display="flex" py={1} pr={2}>
        <SoftTypography onClick={() => openModal('P Rating')} style={{cursor:'pointer'}} variant="button" fontWeight="bold" textTransform="capitalize">
          P Ratings ({pTotal} | {isNaN(pRate) ?(<>0</>):(<>{pRate}</>)}<StarIcon style={{fontSize:20,color:'#FFD700'}}/>):
        </SoftTypography>
        <SoftTypography style={{
          marginLeft: 5,
        }} variant="button" fontWeight="regular" color="text">
        <Rating style={{marginTop:5}} name="read-only" readOnly value={pRate} precision={0.5} />
        </SoftTypography>
      </SoftBox>
        </div>

          <div>
          <SoftBox style={{
            alignItems: "center"
          }}  display="flex" py={1} pr={2}>
          <SoftTypography onClick={() => openModal('Divi Rating')} style={{cursor:'pointer'}}  variant="button" fontWeight="bold" textTransform="capitalize">
            Divi Ratings ({dVTotal} | {isNaN(dVRate) ?(<>0</>):(<>{dVRate}</>)}<StarIcon style={{fontSize:20,color:'#FFD700'}}/>):
          </SoftTypography>
          <SoftTypography style={{
            marginLeft: 5,
          }} variant="button" fontWeight="regular" color="text">
          <Rating style={{marginTop:5}} name="read-only" readOnly value={dVRate} precision={0.5} />
          </SoftTypography>
        </SoftBox>
          </div>

          <div>
          <SoftBox style={{
            alignItems: "center"
          }}  display="flex" py={1} pr={2}>
          <SoftTypography variant="button" onClick={() => openModal('MC Rating')} style={{cursor:'pointer'}} fontWeight="bold" textTransform="capitalize">
            M.C Ratings ({McTotal} | {isNaN(McRate) ?(<>0</>):(<>{McRate}</>)}<StarIcon style={{fontSize:20,color:'#FFD700'}}/>):
          </SoftTypography>
          <SoftTypography style={{
            marginLeft: 5,
          }} variant="button" fontWeight="regular" color="text">
          <Rating style={{marginTop:5}} name="read-only" readOnly value={McRate} precision={0.5} />
          </SoftTypography>
        </SoftBox>
          </div>

        </SoftBox>
      </SoftBox>

      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={modalShow}
      onHide={() => setModalShow(false)}
      style={{
        zIndex:2000
      }}
      >
      <Modal.Header closeButton
      style={{
        background: 'linear-gradient(310deg, #0000FF, #8A8AFF)',
        color:'#fff'
      }}
      >
      <Modal.Title id="contained-modal-title-vcenter">
        {name}
      </Modal.Title>
      </Modal.Header>
      <Modal.Body
      style={{
        background: '#fff',
        height:'auto',
        overflowY:'auto'
      }}
      >
      
      {name === 'P Rating' ? (
        <Pratings pWorks={pWorks} userId={authId} isApproved={isApproved}/>
      ): name === 'Divi Rating' ? (
        <Diviratings pWorks={diviworks} userId={authId} isApproved={isApproved}/>
      ): (
        <Mcratings pWorks={mcworks} userId={authId} isApproved={isApproved}/>
      )}
      </Modal.Body>
      </Modal>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard2.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard2;
