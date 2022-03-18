import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ContactUs() {
  return (
      <div>
<Card sx={{ height:'500px'}}>
      <CardMedia
        component="img"
        height="250"
        image="/img/contactus.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Reach out to us.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">email</Button>
        <Button size="small">info@thetidbit.in</Button>
      </CardActions>
    </Card>
      </div>
    
  );
}