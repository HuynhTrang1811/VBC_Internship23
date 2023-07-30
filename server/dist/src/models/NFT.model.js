"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NFTSchema = new mongoose_1.Schema({
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
});
// NFTSchema.pre('findOneAndUpdate', function (next) {
//     this.set({ updatedAt: new Date(Date.now()) })
//     next()
// })
const nfts = (0, mongoose_1.model)('nft', NFTSchema);
exports.default = nfts;
