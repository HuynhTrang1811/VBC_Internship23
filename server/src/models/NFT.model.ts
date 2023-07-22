import mongoose, { Schema, model, ObjectId } from 'mongoose'

export interface INFT {
    name: string
    img:string
    price:string
    expirationDateTime: String
    time_out: Date
    minter:string
    tokenID:number
    state: 'renting' | 'selling' | 'minted' 
    tokenURI: string
}

const NFTSchema = new Schema<INFT>({
    name: {
        type: String,
    },
    img:{type:String},
    price:{type:String},
    expirationDateTime: { type: String, default: Date.now() },
    time_out: { type: Date, default: Date.now() },
    minter:{type:String},
    tokenID:{type:Number},
    state: {type: String},
    tokenURI: { type:String}
})

// NFTSchema.pre('findOneAndUpdate', function (next) {
//     this.set({ updatedAt: new Date(Date.now()) })
//     next()
// })

const nfts = model<INFT>('nft', NFTSchema)
export default nfts
