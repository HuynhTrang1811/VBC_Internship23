// import mongoose, { Schema, model, ObjectId } from 'mongoose'
// import { INFT } from './NFT.model'
// export interface IRentNFT extends INFT {
//     name: string
//     img:string
//     price:string
//     expirationDateTime: Date
//     time_out: Date
//     minter:string
//     tokenID:number
//     timeRange: {
//         startTime: Date;
//         endTime: Date;
//     };
//     rent_price:String


// }

// const rentNFTSchema = new Schema<IRentNFT>({
//     name: {
//         type: String,
//     },
//     img:{type:String},
//     price:{type:String},
//     expirationDateTime: { type: Date, default: Date.now() },
//     time_out: { type: Date, default: Date.now() },
//     minter:{type:String},
//     tokenID:{type:Number},
//     timeRange: {
//         startTime: Date,
//         endTime: Date
//     },
//     rent_price:String
// })

// const rentnfts = model<IRentNFT>('rentnfts', rentNFTSchema)
// export default rentnfts
