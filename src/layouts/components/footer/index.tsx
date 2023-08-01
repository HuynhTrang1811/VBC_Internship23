import Grid from '@mui/material/Grid';
import "./Footer.css";
import Typography from '@mui/material/Typography';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
const Footer = () => {
  return (
    <>
      <div className="footer">
    
        <Grid container spacing={3} columns={18} justifyContent="flex-end">
          <Grid item xs={6}>
            <Typography mt={3} gutterBottom variant="h5" component="div">
              PRODUCT OF
            </Typography>
            <Typography mt={3} >
              <img src="https://agridential.vn/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fagridential%2Fimage%2Fupload%2Fv1570694865%2FLogo%2Flogo_vbc_kijy1j.png&w=1920&q=75" style={{ width: 217, height: 51 }} />
            </Typography>

          </Grid>
          <Grid item xs={6}>

            <Typography mt={3} gutterBottom variant="h5" component="div">
              CONTACT
            </Typography>
            <Typography mt={3} variant="body2">
              <AddLocationAltIcon /> 28/3 Lu Gia, Ward 15, District 11, Ho Chi Minh City
            </Typography>
            <Typography mt={3} variant="body2">
              <LocalPhoneIcon /> 028 6271 7798

            </Typography>
            <Typography mt={3} variant="body2">
              <EmailIcon /> contact@vietnamblockchain.asia
            </Typography>

          </Grid>
          <Grid item xs={6}>
            <Typography mt={3} gutterBottom variant="h5" component="div">
              SOCIAL  MEDIA
            </Typography>

            <Typography mt={3} variant="body2">
              <FacebookIcon />  <InstagramIcon /> <TwitterIcon /> <PinterestIcon />
            </Typography>


          </Grid>
        </Grid>


      </div>


    </>
  );
};

export default Footer;
