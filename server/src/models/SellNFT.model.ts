// import mongoose, { Schema, model, ObjectId } from 'mongoose'
// import { INFT } from './NFT.model'
// export interface IsellNFT extends INFT {
//     name: string
//     img:string
//     price:string
//     expirationDateTime: Date
//     time_out: Date
//     minter:string
//     tokenID:number
//     sell_price:String


// }

// const sellNFTSchema = new Schema<IsellNFT>({
//     name: {
//         type: String,
//     },
//     img:{type:String},
//     price:{type:String},
//     expirationDateTime: { type: Date, default: Date.now() },
//     time_out: { type: Date, default: Date.now() },
//     minter:{type:String},
//     tokenID:{type:Number},
//     sell_price:String
// })

// const sellnfts = model<IsellNFT>('sellnfts', sellNFTSchema)
// export default sellnfts
