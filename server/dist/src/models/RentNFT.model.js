"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rentNFTSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    minter: { type: String },
    tokenID: { type: Number },
    startTime: { type: Number, default: Date.now() },
    endTime: { type: Number },
    rent_price: { type: Number },
    renter: { type: String },
    end: { type: Boolean, default: false },
    rent_fee: { type: Number }
});
const rentnfts = (0, mongoose_1.model)('rentnfts', rentNFTSchema);
exports.default = rentnfts;
