import { listNft, unlistNft } from '../../../contracts/nftList';
import { rentNft } from '../../../contracts/nftRent';
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
import { getcurentWalletconnect } from '../../../contracts/utils/getAbis';
import { endRent, getMoney } from '../../../contracts/endRent';
import CountdownTimer, { calTimeLeft } from './CountdownTimer';
import { useGlobalContext } from '../../../store/GlobalContext';

const Owned = (item: any) => {
  const [openSell, setOpenSell] = useState(false);
  const [openRent, setOpenRent] = useState(false);
  const [nftPrice, setNFTPrice] = useState(0);
  let nftInput = nftPrice;
  const { state, dispatch } = useGlobalContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    nftInput = parseInt(event.target.value);


  };
  const handleOpenRent = () => {
    setOpenRent(true);
  }

  const handleOpenSell = () => {
    setOpenSell(true);
  }
  const handleCloseSell = async () => {
    setNFTPrice(nftInput);
    setOpenSell(false);
    // listN+ft(1, price);
    console.log(nftInput);
    try {
      await handleList(nftInput);
      await axios.post('/route/sellNFT', { ...item, price: nftInput });
      socket.emit('update')
      dispatch({ type: "SET_UPDATE_USER", payload: !state.update_user });

    }
    catch (err) {
      console.log("something went wrong ")
    }



  }
  const handleRent = async (deposit: number, renttime: number) => {
    await rentNft("NETFLIX" as string, item.tokenID, renttime, deposit, nftRentfee);
  }
  const handleCloseRent = async () => {
    // setNFTPrice(nftRenttime);

    setOpenRent(false);
    console.log(nftDeposit);
    try {
      await handleRent(nftDeposit, nftRenttime);
      await axios.post('/route/rentNFT', { ...item, price: nftDeposit, nftRenttime, rent_fee: nftRentfee })
      socket.emit('update')
      dispatch({ type: "SET_UPDATE_USER", payload: !state.update_user });

    }
    catch (err) {
      console.log("something went wrong", err)
    }



  }

  const [deposit, setDeposit] = useState(0);
  const [renttime, setRenttime] = useState(0);
  const [rentFee, setRentFee] = useState(0);
  /// best practice
  let nftDeposit = deposit;
  let nftRenttime = renttime;
  let nftRentfee = rentFee;
  const handleChangeDeposit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    nftDeposit = parseInt(event.target.value);
  }
  const handleChangeRenttime = async (event: React.ChangeEvent<HTMLInputElement>) => {
    nftRenttime = parseInt(event.target.value) * 1000;
  }
  const handleChangeRentFee = async (event: React.ChangeEvent<HTMLInputElement>) => {
    nftRentfee = (parseInt(event.target.value))
    
  }
  const handleList = async (price: number) => {

    await listNft("NETFLIX" as string, item.tokenID, price);

  }
  const handleUnlist = async () => {
    try {
      await unlistNft("NETFLIX", item.tokenID)
      const minter = await getcurentWalletconnect();
      console.log(minter);
      await axios.post('/route/unlistNFT', { ...item, minter });
      socket.emit('update')
      dispatch({ type: "SET_UPDATE_USER", payload: !state.update_user });


    }
    catch {
      console.log('Something went wrong')
    }

  }
  const handleTurnBack = async () => {
    const data_change = {
      minter: item.getback,
      price: item.price,
      renter: await getcurentWalletconnect(),
      tokenID: item.tokenID
    }
    try {
      await endRent("NETFLIX", data_change.tokenID)
      await axios.post('/route/turnbackNFT', data_change)

      socket.emit('update')
      dispatch({ type: "SET_UPDATE_USER", payload: !state.update_user });

      setTimeout(() => {
        socket.emit('user', { walletAddress: data_change.minter })
      }, 100)
    }
    catch (err) {

    }

  }
  const handleGetMoney = async () => {
    try {
      await getMoney(item.tokenID)
      await axios.post('/route/getMoney', { tokenID: item.tokenID })
      dispatch({ type: "SET_UPDATE_USER", payload: !state.update_user });


    } catch (err) {
      console.log('something went wrong with get money', err);
    }
  }
  const Actions = (status: any) => {
    if (item.is_rent) {
      return (<>
        <DialogActions className='turnback'>
          {item.expired}
          <Button disabled={item.rent && item.expired == false} className='account-button' variant="contained" onClick={item.rent ? handleGetMoney : handleTurnBack}>
            {item.rent ? "Get money" : "Turn back"}
          </Button>
          {item.price_rent && item.status === 'owner' ? <h4>Get back {item.price_rent} USDT deposit</h4> : null}
        </DialogActions>
      </>)
    }
    else if (status.status == "owner") {
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

                        <TextField
                          helperText="Please enter time"
                          id="demo-helper-text-aligned-no-helper"
                          label="..."
                          onChange={handleChangeRenttime}
                        />


                        <TextField
                          helperText="Please enter deposit"
                          id="demo-helper-text-aligned-no-helper"
                          label="dds"
                          onChange={handleChangeDeposit}
                          defaultValue={0}
                        />
                        <TextField
                          helperText="Please enter rent fee"
                          id="demo-helper-text-aligned-no-helper"
                          label="dds"
                          onChange={handleChangeRentFee}
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
    }
    else {
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
      <TableCell className='cell-name'>
        <img className='owned-img' src={item.img} />


      </TableCell >
      <TableCell className='cell-name' >

        {item.name}

      </TableCell>
      <TableCell className='cell-name' align="center" >{item.tokenID}</TableCell>

      {item.status === 'rent' ?
      <> 
      <TableCell className='cell-name' align="center">{ item.is_rent ?  <CountdownTimer targetDate={item.time_out}/> : calTimeLeft(item.duration_rent) }</TableCell>
        <TableCell className='cell-name' align="center">{ item.price_rent}</TableCell> 
        <TableCell className='cell-name' align="center">{ item.rent_fee}</TableCell>
      </>
      : <TableCell className='cell-name' align="center">{ item.expirationDateTime ? <CountdownTimer targetDate={item.expirationDateTime}/> : null}</TableCell>
      }
      {item.status === 'onsale' ?
      <TableCell className='cell-name' align="center">{ item.price}</TableCell>
      : null
      }
      <TableCell align="center" className={item.status === 'OnSale' ? 'cell-name-sale' : item.status === 'Owner' ? 'cell-name-owner' : 'cell-name-rent'}>{item.is_rent ? 'In rent' : item.status}</TableCell>
      <TableCell align="center"><Actions status={item.status} /></TableCell>
    </>
  )
}

export default Owned