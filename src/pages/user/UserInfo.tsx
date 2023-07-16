import React, { useState } from 'react'
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
const UserInfo = () => {
  const NFTs = [
    { id: "1", name: "Zuki", img: "https://i.pinimg.com/236x/f1/35/e0/f135e01ae46897b325b93e4c9e112a0f.jpg", price: "0.1ETH", time_left: "3m 2d", status: "OnSale" },
    { id: "2", name: "Zuki1", img: "https://i.pinimg.com/236x/f1/35/e0/f135e01ae46897b325b93e4c9e112a0f.jpg", price: "0.1ETH", time_left: "3m 2d", status: "Owner" },
    { id: "3", name: "Zuki2", img: "https://i.pinimg.com/236x/f1/35/e0/f135e01ae46897b325b93e4c9e112a0f.jpg", price: "0.1ETH", time_left: "3m 2d", status: "Renting" },
    { id: "4", name: "Zuki3", img: "https://i.pinimg.com/236x/f1/35/e0/f135e01ae46897b325b93e4c9e112a0f.jpg", price: "0.1ETH", time_left: "3m 2d", status: "Owner" },
    { id: "5", name: "Zuki4", img: "https://i.pinimg.com/236x/f1/35/e0/f135e01ae46897b325b93e4c9e112a0f.jpg", price: "0.1ETH", time_left: "3m 2d", status: "OnSale" },
    { id: "6", name: "Zuki5", img: "https://i.pinimg.com/236x/f1/35/e0/f135e01ae46897b325b93e4c9e112a0f.jpg", price: "0.1ETH", time_left: "3m 2d", status: "Owner" },
  ]
  const [toggle, setToggle] = useState(1);


  const toggleTab = (index: any) => {
    setToggle(index)
  };


  return (<>


    <div className="app-user-function">

      <div className='bloc-tabs'>
        <div className={toggle === 1 ? "active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
          <h4> OWNED</h4>
        </div>
        <div className={toggle === 2 ? "active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
          <h4>  RENTED</h4>
        </div>
        <div className={toggle === 3 ? "active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
          <h4>  ONSALE</h4>
        </div>

      </div>
      <div className='content-tabs'>
        <div className={toggle === 1 ? "active-content" : "content"}>
          <div className="owner-NFT">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow >
                    <TableCell></TableCell>
                    <TableCell className='row-name' >NAME</TableCell>
                    <TableCell className='row-name' align="center">PASSWORD</TableCell>
                    <TableCell className='row-name' align="center">TIME OUT</TableCell>
                    <TableCell className='row-name' align="center">STATUS</TableCell>
                    <TableCell className='row-name' align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {NFTs.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <Owned name={row.name} img={row.img} price={row.price} time_left={row.time_left} status={row.status} />

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </div>
        <div className={toggle === 2 ? "active-content" : "content"} >
          <div className="owner-NFT">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow >
                    <TableCell></TableCell>
                    <TableCell className='row-name' >NAME</TableCell>
                    <TableCell className='row-name' align="center">PASSWORD</TableCell>
                    <TableCell className='row-name' align="center">
                      TIME START</TableCell>
                    <TableCell className='row-name' align="center">TIME OUT</TableCell>
                  
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                 
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </div>
        <div className={toggle === 3 ? "active-content" : "content"}>
          <div className="owner-NFT">
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
                  {/* {NFTs.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <Owned name={row.name} img={row.img} price={row.price} time_left={row.time_left} status={row.status} />

                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </div>

      </div>

    </div>



  </>
  )
}
export default UserInfo;
