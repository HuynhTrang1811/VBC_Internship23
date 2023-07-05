import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Home.css'
import { useCart } from "react-use-cart"
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const Item = (item: any) => {
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

    const { addItem } = useCart();
    return (
        <>

            <Card sx={{ maxWidth: 280}}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="230"
                    image={item.img}
                   sx={{
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "scale3d(1.05, 1.05, 1.1)"
          }
        }}
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
                        <Stack>
                        <Button className="app-home-item-button-add" variant="contained" onClick={()=>{handleClick(),addItem(item.item)} }   >add cart</Button>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                               Add to cart successfully !
                            </Alert>
                        </Snackbar>  
                        </Stack>        
                        <Button className="app-home-item-button-buy" variant="contained" >buy</Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
export default Item;


