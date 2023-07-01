
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const UseNFT = (item:any) => {
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
                        <Button className="app-home-item-button-add" variant="contained" >SELL</Button>
                    </div>
                </CardContent>
            </Card>
        </>
  )
}
