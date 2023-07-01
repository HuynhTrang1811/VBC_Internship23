
import Stack from '@mui/material/Stack';
import React from 'react';
import { useCart } from 'react-use-cart';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
const CartNFT = (item:any) => {
    const {removeItem} =useCart();
    const [open, setOpen] = React.useState(false);
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });



    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

  return (
   <>
     <Card sx={{ maxWidth: 250 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="150"
                    image={item.img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <div className='price'>
                        <p>Price:</p>
                        <p>{item.price}</p>
                    </div>
                    <div className='price'>
                        <p>Time left:</p>
                        <p>{item.time}</p>
                    </div>
                </CardContent>
                <CardContent>
                    <div className='app-home-item-button'>
                        <Button className="app-home-item-button-add" variant="contained" >pay </Button>
                           <Stack>
                        <Button className="app-home-item-button-add" variant="contained" onClick={()=>{removeItem(item.id),handleClick()} }   >Remove</Button>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                              Remove from cart successfully !
                            </Alert>
                        </Snackbar>  
                        </Stack>        
                      
                    </div>
                </CardContent>
            </Card>
   </>
  )
}

export default CartNFT