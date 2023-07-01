import './Home.css'
import Grid from '@mui/material/Grid';
import Item from './Item';
import Pagination from '@mui/material/Pagination';
import product from '../../api/product';
const Market = () => {
 
  return (
    <div className='app-home-market'>
      <div className='app-home-market-container'>
        <h4>LIST ACCOUNTS</h4>
        <div className='app-home-market-item'>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={24}>
            {product.productData.map((item: any) => {
              return (
                <Grid item xs={6} key={item.id} >
                  <Item item={item}  name={item.name} price={item.price} img={item.img} time={item.time} />
                </Grid>
              )
            })}

          </Grid>
        </div>
        <div className='app-home-martket-pagi'>
          <Pagination count={10} shape="rounded" />
        </div>
      </div>

    </div>
  )
}
export default Market;

