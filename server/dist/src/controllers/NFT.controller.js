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
exports.turnbackNFT = exports.rentlogNFT = exports.rentNFT = exports.changeOwner = exports.unlistNFT = exports.sellNFT = exports.createNFT = exports.getSellNFT = exports.getRentNFT = exports.getRentNFTUser = exports.getSellNFTUser = exports.getOwnerNFTUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const NFT_model_1 = __importDefault(require("../models/NFT.model"));
const RentNFT_model_1 = __importDefault(require("../models/RentNFT.model"));
const catchAsync_1 = require("../utils/catchAsync");
const __1 = require("../..");
//-------------------------User-------------------------
// [GET] /api/route/getOwnerNFTUser
//get all NFT owner for user
exports.getOwnerNFTUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield NFT_model_1.default.find({ minter: req.params.address.toLowerCase(), status: "owner" });
    const nft_rent = yield RentNFT_model_1.default.find({ renter: req.params.address.toLowerCase() });
    console.log(nft);
    res.json(nft.map(product => {
        let x;
        if (x = nft_rent === null || nft_rent === void 0 ? void 0 : nft_rent.find(ele => ele.tokenID == product.tokenID)) {
            const newProduct = JSON.parse(JSON.stringify(product));
            return Object.assign(newProduct, {
                is_rent: true,
                getback: x.minter,
            });
        }
        else
            return product;
    }));
}));
// [GET] /api/route/getSellNFTUser
//get all NFT owner for user
exports.getSellNFTUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield NFT_model_1.default.find({ minter: req.params.address.toLowerCase(), status: "onsale" });
    res.json(nft.map(product => product));
}));
// [GET] /api/route/getRentNFTUser
//get all NFT owner for user
exports.getRentNFTUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let nft = (yield NFT_model_1.default.find({ minter: req.params.address.toLowerCase(), status: "rent" })) || [];
    const nft_rent = yield RentNFT_model_1.default.find({ minter: req.params.address.toLowerCase() });
    let x = [...nft];
    if (nft_rent) {
        let data = yield NFT_model_1.default.find({ tokenID: { $in: nft_rent.map(ele => ele.tokenID) } });
        x = [...nft, ...(data.map(ele => {
                const newProduct = JSON.parse(JSON.stringify(ele));
                return Object.assign(newProduct, {
                    is_rent: true,
                    expired: false,
                });
            }))];
    }
    console.log(x);
    res.json(x.map(product => product));
}));
//-------------------------Market-------------------------
// [GET] /api/route/getNFT
//get all NFT rent for market
exports.getRentNFT = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield NFT_model_1.default.find({ status: "rent" });
    console.log(nft);
    res.json(nft.map(product => product));
}));
//get all NFT sell for market
exports.getSellNFT = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield NFT_model_1.default.find({ status: "onsale" });
    console.log(nft);
    res.json(nft.map(product => product));
}));
// [POST] /api/route/createNFT
const createNFT = (req, res, next) => {
    const location = NFT_model_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        status: 'success',
        data: {
            location,
        },
    });
};
exports.createNFT = createNFT;
// [POST] /api/route/sellNFT
// post to SellNFT
const sellNFT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenID = req.body.tokenID;
    console.log(tokenID);
    // const sellNFT=SellNFT.create({name,time_mint,minter});
    const x = yield NFT_model_1.default.findOneAndUpdate({ tokenID }, { status: 'onsale', price: req.body.price });
    const data = yield NFT_model_1.default.findOneAndDelete({ tokenID, status: 'owner' });
    console.log(data);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT: exports.sellNFT,
        },
    });
});
exports.sellNFT = sellNFT;
const unlistNFT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenID, minter } = req.body;
    console.log(tokenID);
    // const sellNFT=SellNFT.create({name,time_mint,minter});
    const x = yield NFT_model_1.default.findOneAndUpdate({ minter, tokenID }, { status: 'owner' });
    console.log(x);
    if (x) {
        yield NFT_model_1.default.findOneAndDelete({ tokenID, status: 'onsale' });
        yield NFT_model_1.default.findOneAndDelete({ tokenID, status: 'rent' });
        yield RentNFT_model_1.default.findOneAndDelete({ tokenID });
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT: exports.sellNFT,
        },
    });
});
exports.unlistNFT = unlistNFT;
const changeOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenID, minter, owner } = req.body;
    console.log(req.body);
    // const sellNFT=SellNFT.create({name,time_mint,minter});
    const x = yield NFT_model_1.default.findOneAndUpdate({ tokenID, minter }, { status: 'owner', minter: owner.toLowerCase() });
    yield NFT_model_1.default.findOneAndDelete({ tokenID, status: 'onsale' });
    yield NFT_model_1.default.findOneAndDelete({ tokenID, status: 'rent' });
    __1.io.emit('update');
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT: exports.sellNFT,
        },
    });
});
exports.changeOwner = changeOwner;
const rentNFT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenID = req.body.tokenID;
    console.log(tokenID);
    const { price, nftRenttime } = req.body;
    // const sellNFT=SellNFT.create({name,time_mint,minter});
    const x = yield NFT_model_1.default.findOneAndUpdate({ tokenID }, { status: 'rent', price_rent: price, duration_rent: nftRenttime });
    const data = yield NFT_model_1.default.findOneAndDelete({ tokenID, status: 'owner' });
    // await RentNFT.create({ 
    //     minter: x?.minter, 
    //     tokenID: x?.tokenID,
    //     endTime: Date.now() + nftRenttime,
    //     rent_price: price,
    //     renter: "", 
    // })
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT: exports.sellNFT,
        },
    });
});
exports.rentNFT = rentNFT;
const rentlogNFT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield RentNFT_model_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT: exports.sellNFT,
        },
    });
});
exports.rentlogNFT = rentlogNFT;
const turnbackNFT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenID, minter, renter, price } = req.body;
    console.log(req.body);
    const x = yield NFT_model_1.default.findOneAndUpdate({ tokenID, minter: renter }, { status: 'owner', minter: minter });
    yield RentNFT_model_1.default.findOneAndDelete({ tokenID, renter });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        status: 'success',
        data: {
            sellNFT: exports.sellNFT,
        },
    });
});
exports.turnbackNFT = turnbackNFT;
