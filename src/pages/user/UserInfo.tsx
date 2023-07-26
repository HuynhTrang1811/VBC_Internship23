import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Owned from './NFT/Owned';
import "../home/Cards.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./User.css"
import RentedNFT from './NFT/RentedNFT';
import axios from '../../api';
import { getcurentWalletconnect } from '../../contracts/utils/getAbis';
import Button from '../../layouts/components/button/Button';
interface Product {
  id: string;
  name: string;
  img: string;
  type: string;
  owner: string;
  time_left: string;
  price: string;
  status: string;
  tokenID: string; 
}
const UserInfo = () => {
  //products : have owner, sell, rent NFT of user
  const [ownerNFT, setOwner] = useState<any[]>([])
  const [sellNFT, setSell] = useState<Product[]>([]);
  const [rentNFT, setRent] = useState<Product[]>([]);

  const [toggle, setToggle] = useState(1);
  const [update, setUpdate] = useState(false);

  const toggleTab = (index: any) => {
    setToggle(index)
  };
  useEffect( () => {
    const foo = async () => {
      const address = await getcurentWalletconnect(); 
      // const get = encodeURIComponent(address);
     
      axios.get('/route/getOwnerNFTUser/' + address)
        .then((res) => { 
          setOwner(res.data);
         
        })
        .catch(error => console.log(error))
      axios.get('/route/getSellNFTUser/' + address)
        .then((res) => {
          setSell(res.data)
       
        })
        .catch(error => console.log(error))
      axios.get('/route/getRentNFTUser/' + address)
        .then((res) => {
          setRent(res.data)
          
  
        })
        .catch(error => console.log(error))  
    }
    foo(); 
  }, [update])

  return (<>

    <div className="app-user-function">

      <div className='bloc-tabs'>
        <div className={toggle === 1 ? "active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
          <h4>OWNED</h4>
        </div>
        <div className={toggle === 2 ? "active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
          <h4>ONSALE</h4>
        </div>
        <div className={toggle === 3 ? "active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
          <h4>RENTED</h4>
        </div>

      </div>
      <div className='content-tabs'>
        <div className={toggle === 1 ? "active-content" : "content"}>
          <div className="owner-NFT">
          {ownerNFT.length == 0 ? <>
          <div className='owner-empty'>
            Your don't have any NFT.
          
            </div>
                  </>: 
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow >
                    <TableCell></TableCell>
                    <TableCell className='row-name' >NAME</TableCell>
                    <TableCell className='row-name' align="center">TOKEN ID</TableCell>
                    <TableCell className='row-name' align="center">TIME OUT</TableCell>
                    <TableCell className='row-name' align="center">STATUS</TableCell>
                    <TableCell className='row-name' align="center"></TableCell>
                  </TableRow>
                </TableHead>
               
               <TableBody>
                    {ownerNFT.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <Owned update={update} setUpdate={setUpdate} tokenID = {row.tokenID} name={row.name} img={row.img} price={row.price} time_left={row.time_left} status="owner" />

                  </TableRow>
                  ))}
                   </TableBody>
                 
               
              </Table>
            </TableContainer> 
          }
          </div>

        </div>
        <div className={toggle === 2 ? "active-content" : "content"} >
          <div className="owner-NFT">
          {sellNFT.length == 0 ? <>
          <div className='owner-empty'>
            Your don't have any selling NFT.
          
            </div>
                  </>: 
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell></TableCell>
                  <TableCell className='row-name' >NAME</TableCell>
                  <TableCell className='row-name' align="center">TOKEN ID</TableCell>
                  <TableCell className='row-name' align="center">
                    PRICE</TableCell>
                  <TableCell className='row-name' align="center">TIME OUT</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
             {  sellNFT.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <Owned update={update} setUpdate={setUpdate} tokenID = {row.tokenID} name={row.name} img={row.img} price={row.price} time_left={row.time_left} status={row.status} />

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          }
          </div>

        </div>
        <div className={toggle === 3 ? "active-content" : "content"}>
          <div className="owner-NFT">
          {rentNFT.length == 0 ? <>
          <div className='owner-empty'>
            Your don't have any renting NFT.
          
            </div>
                  </>: 
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow >
                    <TableCell></TableCell>
                    <TableCell className='row-name' >NAME</TableCell>
                    <TableCell className='row-name' align="center">PRICE</TableCell>
                    <TableCell className='row-name' align="center">TIME OUT</TableCell>
                    <TableCell className='row-name' align="center">STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
               {rentNFT.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <Owned update={update} setUpdate={setUpdate} tokenID = {row.tokenID} name={row.name} img={row.img} price={row.price} time_left={row.time_left} status={row.status} />

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
}
          </div>

        </div>

      </div>

    </div>



  </>
  )
}
export default UserInfo;
