import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "../../../../soft-components/SoftBox";
import SoftTypography from "../../../../soft-components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "../../../../examples/Navbars/DefaultNavbar";
import PageLayout from "../../../../examples/LayoutContainers/PageLayout";
import Footer from "../../../../examples/Footer";
import image from "../../../../assets/images/nai-1.jpg";


// Authentication layout components

function BasicLayout({ title, description, children }) {
  return (
    <PageLayout>
    <SoftBox
      width="100%"
      minHeight="100vh"
      sx={{
        backgroundImage: image && `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
      }}    
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh'
      }}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={5}>
            {children}
          </Grid>
        </Grid>
      </div>
      
      <Footer />
    </SoftBox>
  </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
