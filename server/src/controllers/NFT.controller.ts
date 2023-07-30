import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import NFT, { INFT } from '../models/NFT.model'
import RentNFT, { IRentNFT } from '../models/RentNFT.model'
// import INFT from '../models/NFT.model'
import { AppError } from '../utils/appError'
import { catchAsync } from '../utils/catchAsync'
import React from 'react';
import { io } from '../..'
//-------------------------User-------------------------
// [GET] /api/route/getOwnerNFTUser
//get all NFT owner for user
export const getOwnerNFTUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const nft = await NFT.find({ minter: req.params.address.toLowerCase(), status: "owner" })
        const nft_rent = await RentNFT.find({ renter: req.params.address.toLowerCase(), end: false });

        console.log(nft)
        res.json(nft.map(product => {
            let x;
            if (x = nft_rent?.find(ele => ele.tokenID == product.tokenID)) {
                const newProduct = JSON.parse(JSON.stringify(product));
                return Object.assign(newProduct, {
                    is_rent: true,
                    getback: x.minter,
                    expirationDateTime: x.endTime
                })
            }
            else return product
        }))
    },
)
// [GET] /api/route/getSellNFTUser
//get all NFT owner for user
export const getSellNFTUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const nft = await NFT.find({ minter: req.params.address.toLowerCase(), status: "onsale" })
        res.json(nft.map(product => product))
    },
)
// [GET] /api/route/getRentNFTUser
//get all NFT owner for user
export const getRentNFTUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        let nft = await NFT.find({ minter: req.params.address.toLowerCase(), status: "rent" }) || [];
        const nft_rent = await RentNFT.find({ minter: req.params.address.toLowerCase() });
        let x: any[] = [...nft];
        if (nft_rent) {
            const end_data: any = nft_rent.reduce((pre, curr) => {
                return {
                    ...pre,
                    [curr.tokenID]: curr.end
                }
            }, {})
            console.log(end_data)
            let data = await NFT.find({ tokenID: { $in: nft_rent.map(ele => ele.tokenID) } })
            x = [...nft, ...(data.map(ele => {
                const newProduct: any = JSON.parse(JSON.stringify(ele));
                return Object.assign(newProduct, {
                    is_rent: true,
                    expired: end_data[newProduct.tokenID],
                })
            }))];
        }
        console.log(x);
        res.json(x.map(product => product))
    },
)
//-------------------------Market-------------------------
// [GET] /api/route/getNFT
//get all NFT rent for market
export const getRentNFT = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {


        const nft = await NFT.find({ status: "rent" })
        console.log(nft)
        res.json(nft.map(product => product))
    },
)
//get all NFT sell for market
export const getSellNFT = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {


        const nft = await NFT.find({ status: "onsale" })
        console.log(nft)
        res.json(nft.map(product => product))
    },
)
interface RequestVBC extends Request {
    body: INFT
}
// [POST] /api/route/createNFT
export const createNFT = (req: Request, res: Response, next: NextFunction) => {
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
export const sellNFT = async (req: Request, res: Response, next: NextFunction) => {
    const tokenID = req.body.tokenID;
    console.log(tokenID);
    // const sellNFT=SellNFT.create({name,time_mint,minter});
    const x = await NFT.findOneAndUpdate({ tokenID }, { status: 'onsale', price: req.body.price })
    const data = await NFT.findOneAndDelete({ tokenID, status: 'owner' })

    console.log(data);
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT,
        },
    })
}

export const unlistNFT = async (req: Request, res: Response, next: NextFunction) => {
    const { tokenID, minter } = req.body;
    console.log(tokenID);
    // const sellNFT=SellNFT.create({name,time_mint,minter});
    const x = await NFT.findOneAndUpdate({ minter, tokenID }, { status: 'owner' })
    console.log(x);
    if (x) {
        await NFT.findOneAndDelete({ tokenID, status: 'onsale' })
        await NFT.findOneAndDelete({ tokenID, status: 'rent' })
        await RentNFT.findOneAndDelete({ tokenID })
    }

    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT,
        },
    })
}

export const changeOwner = async (req: Request, res: Response, next: NextFunction) => {
    const { tokenID, minter, owner } = req.body;
    console.log(req.body);
    // const sellNFT=SellNFT.create({name,time_mint,minter});
    const x = await NFT.findOneAndUpdate({ tokenID, minter }, { status: 'owner', minter: (owner as string).toLowerCase() })
    await NFT.findOneAndDelete({ tokenID, status: 'onsale' })
    await NFT.findOneAndDelete({ tokenID, status: 'rent' })
    io.emit('update');
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT,
        },
    })
}

export const rentNFT = async (req: Request, res: Response, next: NextFunction) => {
    const tokenID = req.body.tokenID;
    console.log(tokenID);
    const { price, nftRenttime } = req.body
    // const sellNFT=SellNFT.create({name,time_mint,minter});
    const x = await NFT.findOneAndUpdate({ tokenID }, { status: 'rent', price_rent: price, duration_rent: nftRenttime })
    const data = await NFT.findOneAndDelete({ tokenID, status: 'owner' })
    // await RentNFT.create({ 
    //     minter: x?.minter, 
    //     tokenID: x?.tokenID,
    //     endTime: Date.now() + nftRenttime,
    //     rent_price: price,
    //     renter: "", 
    // })
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT,
        },
    })
}

export const rentlogNFT = async (req: Request, res: Response, next: NextFunction) => {
    await RentNFT.create(req.body)
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT,
        },
    })
}

export const turnbackNFT = async (req: Request, res: Response, next: NextFunction) => {
    const { tokenID, minter, renter, price } = req.body;
    console.log(req.body);
    const x = await NFT.findOneAndUpdate({ tokenID, minter: renter }, { status: 'owner', minter: minter })
    await RentNFT.findOneAndDelete({ tokenID, renter });
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT,
        },
    })
}

export const getMoney = async (req: Request, res: Response, next: NextFunction) => {
    const { tokenID } = req.body;
    await RentNFT.findOneAndDelete({ tokenID });
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT,
        },
    })
}