import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import NFT, { INFT } from '../models/NFT.model'
// import INFT from '../models/NFT.model'
import { AppError } from '../utils/appError'
import { catchAsync } from '../utils/catchAsync'

// [GET] /api/route/getNFT
export const getNFT = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const nft = await NFT.find({})
        res.json(nft.map(product => product))
        // res.status(StatusCodes.OK).json({
        //     data: {
        //         nft,
        //     },
        // })
      
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



// // [PUT] /api/location/controlWaterPumping
// export const controlWaterPumping = catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {
//         console.log(req.body)
//         const control = await Location.findOneAndUpdate(
//             { _id: req.body.id },
//             { water_pumping_status: req.body.water_pumping_status },
//             {
//                 new: true,
//                 runValidators: true,
//             },
//         )
//         res.status(StatusCodes.OK).json({
//             status: 'success',
//             data: {
//                 control,
//             },
//         })
//     },
// )

// // [PUT] /api/location/controlLight
// export const controlLight = catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {
//         console.log(req.body)
//         const control = await Location.findOneAndUpdate(
//             { _id: req.body.id },
//             { light_status: req.body.light_status },
//             {
//                 new: true,
//                 runValidators: true,
//             },
//         )
//         res.status(StatusCodes.OK).json({
//             status: 'success',
//             data: {
//                 control,
//             },
//         })
//     },
// )
// // [PUT] /api/location/updateLocation
// export const updateLocation = catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {
//         const { name, device, id } = req.body
//         const updateLocation = await Location.findOneAndUpdate(
//             { _id: id },
//             { name, device },
//             {
//                 new: true,
//                 runValidators: true,
//             },
//         )

//         res.status(StatusCodes.OK).json({
//             status: 'success',
//             data: {
//                 updateLocation,
//             },
//         })
//     },
// )

// //[DELETE] /api/location/deleteLocation
// export const deleteLocation = catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {
//         const id = req.body._id
//         const deleteLocation = await Location.findOneAndRemove({ _id: id })
//         res.status(StatusCodes.OK).json({
//             status: 'success',
//             data: {
//                 deleteLocation,
//             },
//         })
//     },
// )
