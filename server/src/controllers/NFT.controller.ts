import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import NFT from '../models/NFT.model'
import INFT from '../models/NFT.model'
import { AppError } from '../utils/appError'
import { catchAsync } from '../utils/catchAsync'
import React from 'react';
//-------------------------User-------------------------
// [GET] /api/route/getOwnerNFTUser
//get all NFT owner for user
export const getOwnerNFTUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const nft = await NFT.find({ minter:req.params.address.toUpperCase(),status:"owner"})
        res.json(nft.map(product => product))
    },
)
// [GET] /api/route/getSellNFTUser
//get all NFT owner for user
export const getSellNFTUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const nft = await NFT.find({ minter:req.params.address.toUpperCase(),status:"onsale"})
        res.json(nft.map(product => product))
    },
)
// [GET] /api/route/getRentNFTUser
//get all NFT owner for user
export const getRentNFTUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const nft = await NFT.find({ minter:req.params.address.toUpperCase(),status:"rent"})
        res.json(nft.map(product => product))
    },
)
//-------------------------Market-------------------------
// [GET] /api/route/getNFT
//get all NFT rent for market
export const getRentNFT = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
     
       
        const nft = await NFT.find({status:"rent"})
        console.log(nft)
        res.json(nft.map(product => product))
    },
)
//get all NFT sell for market
export const getSellNFT = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
     
       
        const nft = await NFT.find({status:"onsale"})
        console.log(nft)
        res.json(nft.map(product => product))
    },
)

// [POST] /api/route/createNFT
export const createNFT= (req:Request,res:Response,next:NextFunction)=>{
    const name=req.body.name;
    const time_mint=req.body.expirationDateTime;
    const minter=req.body.minter.toUpperCase();
    const location = NFT.create({ name,time_mint,minter })
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            location,
        },
    })
}
// [POST] /api/route/sellNFT
//post to SellNFT
// export const sellNFT= (req:Request,res:Response,next:NextFunction)=>{
//     const name=req.body.name;
//     const time_mint=req.body.expirationDateTime;
//     const minter=req.body.minter;
//     const sellNFT=SellNFT.create({name,time_mint,minter});

//     res.status(StatusCodes.CREATED).json({
//         status: 'success',
//         data: {
//             sellNFT,
//         },
//     })
// }

