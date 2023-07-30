import mongoose, { Schema, model, ObjectId } from 'mongoose'

export interface INFT {
    name: string
    img: string
    price: string
    price_rent: number
    expirationDateTime: number
    time_out: Date
    minter: string
    tokenID: number
    status: 'owner' | 'onsale' | 'rent'
    tokenURI: string
    duration_rent: number
}

const NFTSchema = new Schema<INFT>({
    name: {
        type: String,
    },
    img: { type: String },
    price: { type: String },
    price_rent: { type: Number, default: 0 },
    expirationDateTime: { type: Number, default: Date.now() },
    time_out: { type: Date, default: Date.now() },
    minter: { type: String },
    tokenID: { type: Number },
    status: { type: String },
    tokenURI: { type: String },
    duration_rent: { type: Number, default: 0 }
})

// NFTSchema.pre('findOneAndUpdate', function (next) {
//     this.set({ updatedAt: new Date(Date.now()) })
//     next()
// })

const nfts = model<INFT>('nft', NFTSchema)
export default nfts
