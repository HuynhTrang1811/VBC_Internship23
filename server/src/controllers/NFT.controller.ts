import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import NFT, { INFT } from '../models/NFT.model'
// import INFT from '../models/NFT.model'
import { AppError } from '../utils/appError'
import { catchAsync } from '../utils/catchAsync'
import React from 'react';
//-------------------------User-------------------------
// [GET] /api/route/getOwnerNFTUser
//get all NFT owner for user
export const getOwnerNFTUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const nft = await NFT.find({ minter:req.params.address.toLowerCase(), status:"owner"})
        console.log(nft)
        res.json(nft.map(product => product))
    },
)
// [GET] /api/route/getSellNFTUser
//get all NFT owner for user
export const getSellNFTUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const nft = await NFT.find({ minter:req.params.address.toLowerCase(),status:"onsale"})
        res.json(nft.map(product => product))
    },
)
// [GET] /api/route/getRentNFTUser
//get all NFT owner for user
export const getRentNFTUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const nft = await NFT.find({ minter:req.params.address.toLowerCase(),status:"rent"})
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
 interface RequestVBC extends Request {
    body: INFT
}
// [POST] /api/route/createNFT
export const createNFT= (req:Request,res:Response,next:NextFunction)=>{
    const location = NFT.create(req.body)
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            location,
        },
    })
}
// [POST] /api/route/sellNFT
// post to SellNFT
export const sellNFT= async (req:Request,res:Response,next:NextFunction)=>{
    const tokenID=req.body.tokenID;
    console.log(tokenID); 
    // const sellNFT=SellNFT.create({name,time_mint,minter});
    const x = await NFT.findOneAndUpdate({tokenID}, {status: 'onsale'})
    const data = await NFT.findOneAndDelete({tokenID, status:'owner'})
    
    console.log(data);
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT,
        },
    })
}

