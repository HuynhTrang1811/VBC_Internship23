import mongoose, { Schema, model, ObjectId } from 'mongoose'
export interface IRentNFT {
    name: string
    minter:string
    tokenID:number
    startTime: Date;
    endTime: Date;
    rent_price: number;
    renter: string
}

const rentNFTSchema = new Schema<IRentNFT>({
    name: {
        type: String,
    },
    minter:{type:String},
    tokenID:{type:Number},
    startTime: {type: Date, default: Date.now()},
    endTime: {type: Date},
    rent_price:{type: Number},
    renter: {type:String}, 
})

const rentnfts = model<IRentNFT>('rentnfts', rentNFTSchema)
export default rentnfts
