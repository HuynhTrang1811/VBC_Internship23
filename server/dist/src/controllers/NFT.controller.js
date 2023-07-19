"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNFT = exports.getNFT = void 0;
const http_status_codes_1 = require("http-status-codes");
const NFT_model_1 = __importDefault(require("../models/NFT.model"));
const catchAsync_1 = require("../utils/catchAsync");
// [GET] /api/route/getNFT
exports.getNFT = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield NFT_model_1.default.find({});
    res.json(nft.map(product => product));
    // res.status(StatusCodes.OK).json({
    //     data: {
    //         nft,
    //     },
    // })
}));
// [POST] /api/route/createNFT
const createNFT = (req, res, next) => {
    const name = req.body.name;
    const time_mint = req.body.expirationDateTime;
    const minter = req.body.minter;
    const location = NFT_model_1.default.create({ name, time_mint, minter });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        status: 'success',
        data: {
            location,
        },
    });
};
exports.createNFT = createNFT;
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
