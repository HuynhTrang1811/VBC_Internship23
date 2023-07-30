import mongoose, { Schema, model, ObjectId } from 'mongoose'
export interface IRentNFT {
    name: string
    minter: string
    tokenID: number
    startTime: number;
    endTime: number;
    rent_price: number;
    renter: string;
    end: boolean
}

const rentNFTSchema = new Schema<IRentNFT>({
    name: {
        type: String,
    },
    minter: { type: String },
    tokenID: { type: Number },
    startTime: { type: Number, default: Date.now() },
    endTime: { type: Number },
    rent_price: { type: Number },
    renter: { type: String },
    end: { type: Boolean, default: false }
})

const rentnfts = model<IRentNFT>('rentnfts', rentNFTSchema)
export default rentnfts
