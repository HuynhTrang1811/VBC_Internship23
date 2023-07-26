import { listNft, unlistNft } from '../../../contracts/nftList';
import React, { useState } from 'react'
import "./Owner.css"
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TableCell } from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import axios from '../../../api';
import { socket } from '../../../api/socket';

const Owned = (item: any) => {
  const [openSell, setOpenSell] = useState(false);
  const [openRent, setOpenRent] = useState(false);
  const [nftPrice, setNFTPrice] = useState(0);
  let nftInput =nftPrice;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    nftInput = parseInt(event.target.value);
   

  };
  const handleOpenRent = () => {
    setOpenRent(true);
  }
  const handleCloseRent = () => {
    setOpenRent(false);
  }
  const handleOpenSell = () => {
    setOpenSell(true);
  }
  const handleCloseSell = async () => {
    setNFTPrice(nftInput);
    setOpenSell(false);
    // listNft(1, price);
   
    await handleList(nftInput);
    await axios.post('/route/sellNFT', item)
   

    socket.emit('update')
    item.setUpdate(!item.update);


  }
  const [months, setMonths] = useState(0);
  const [price, setPrice] = useState(0);

  const handleList = async (price:number) => {
   
    await listNft("NETFLIX" as string, item.tokenID, price);

  }
  const handleUnlist = async () => {
    try {
      await unlistNft("NETFLIX", item.tokenID)
      await axios.post('/route/unlistNFT', item);
      socket.emit('update')
      item.setUpdate(!item.update);

    }
    catch {
      console.log('Something went wrong')
    }

  }
  

  const Actions = (status: any) => {

    if (status.status == "owner") {
      return (<>
        <div className='action-button'>
          <Button variant="outlined" onClick={handleOpenSell}>Sell</Button>
          <form>

            <Dialog
              open={openSell}
              onClose={handleCloseSell}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              id="alert"
            >

              <DialogTitle id="alert-dialog-title">
                {"Sell NFT"}
              </DialogTitle>
              <DialogContent id="alert-dialog-content">
                <div className="alert-sellNFT">
                  <div className="sellNFT-header">
                    <div className='' >
                      <img className='owned-img' src={item.img} />
                    </div>
                    <div className='sell-inf' >

                      {item.name}<br /><br />
                      Time left: {item.time_left}

                    </div>
                  </div>
                  <div className="sellNFT-input">
                    <TextField id="outlined-basic" label="NFT Price" variant="outlined" helperText="Please enter NFT Price"
                      onChange={handleChange}
                    />
                  </div>


                </div>

              </DialogContent>
              <DialogActions>

                <Button className='account-button' variant="contained" onClick={handleCloseSell}>
                  Sell
                </Button>

              </DialogActions>

            </Dialog>
          </form>
          <Button variant="outlined" onClick={handleOpenRent}>Rent</Button>
          <form>
            {/* Form BUy NFT  */}
            <Dialog
              open={openRent}
              onClose={handleOpenRent}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              id="alert"
            >

              <DialogTitle id="alert-dialog-title">
                {"Sell NFT"}
              </DialogTitle>
              <DialogContent id="alert-dialog-content">
                <div className="alert-sellNFT">
                  <div className="rentNFT-header">
                    <div className='' >
                      <img className='owned-img' src={item.img} />
                    </div>
                    <div className='rent-inf' >

                      {item.name}<br /><br />
                      Time left: {item.time_left}

                    </div>
                  </div>
                  <div className="rentNFT-input">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > :not(style)': { m: 1 },
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <DatePicker
                          label="Renting Date"
                          slotProps={{ textField: { helperText: 'Please enter Renting Date' } }}
                        />

                        <TextField
                          helperText="Please enter NFT price"
                          id="demo-helper-text-aligned-no-helper"
                          label="Renting Price"

                        />
                      </LocalizationProvider>

                    </Box>
                  </div>


                </div>

              </DialogContent>
              <DialogActions>

                <Button className='account-button' variant="contained" onClick={handleCloseRent} >
                  Rent
                </Button>

              </DialogActions>

            </Dialog>
          </form>
        </div>
      </>)
    } else {
      return (<>
        <DialogActions>

          <Button className='account-button' variant="contained" onClick={handleUnlist}>
            Unlist
          </Button>

        </DialogActions>
      </>)
    }
  }
  return (
    <>

      <TableCell className='cell-name' align="center">
        <img className='owned-img' src={item.img} />


      </TableCell >
      <TableCell className='cell-name' align="center" >

        {item.name}

      </TableCell>
      <TableCell className='cell-name' align="center" >{item.tokenID}</TableCell>
      <TableCell className='cell-name' align="center">{item.price}</TableCell>
      <TableCell align="center" className={item.status === 'OnSale' ? 'cell-name-sale' : item.status === 'Owner' ? 'cell-name-owner' : 'cell-name-rent'}>{item.status}</TableCell>
      <TableCell align="center"><Actions status={item.status} /></TableCell>
    </>
  )
}

export default Owned