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
exports.getUser = exports.newUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_model_1 = __importDefault(require("../models/User.model"));
const catchAsync_1 = require("../utils/catchAsync");
//POST address user
const newUser = (req, res, next) => {
    const address = req.body.address;
    const users = User_model_1.default.create({ address });
    console.log("renter");
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        status: 'success',
        data: {
            users,
        },
    });
};
exports.newUser = newUser;
//GET address user
exports.getUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield User_model_1.default.find({});
    res.json(nft);
}));
