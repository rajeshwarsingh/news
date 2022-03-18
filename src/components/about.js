import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
     
      {/* <Typography variant="body2"> */}
          <p><h1>We are tidbit, <br/>we aim to provide information and news. Also, financially educate people through various pieces of information. we are young enthusiasts who research and help information you grow financially. we do our best to provide small and easily accessible information at your fingertips.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1></p>
      
      
      
      {/* </Typography> */}
      <br/><br/><br/>
    </CardContent>
    <CardActions>
      {/* <Button size="small">Learn More</Button> */}
    </CardActions>
  </React.Fragment>
);

export default function CustomImageList() {
    return (
        <div>
            <img width={'100%'} height={'250'} src='/img/who.png' />
            <Box sx={{ height:'500px'}}>
                <Card sx={{ height:'500px'}} variant="outlined">{card}</Card>
            </Box>
        </div>)
}