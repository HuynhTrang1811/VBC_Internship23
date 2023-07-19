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
exports.checkUpdatingLocation = exports.checkLocationIsExist = void 0;
const NFT_model_1 = __importDefault(require("../models/NFT.model"));
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const http_status_codes_1 = require("http-status-codes");
const mongoose = require('mongoose');
exports.checkLocationIsExist = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const location = yield NFT_model_1.default.findOne({ name: req.body.name });
    if (location) {
        return next(new appError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, "this location's name already existed"));
    }
    next();
}));
exports.checkUpdatingLocation = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const locations = yield NFT_model_1.default.find({
        _id: { $nin: [new mongoose.Types.ObjectId(id)] },
    });
    const isExistingLocation = locations.filter((loc) => {
        console.log(loc.name, req.body.name);
        return loc.name === req.body.name;
    });
    if (isExistingLocation.length > 0) {
        return next(new appError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, "this location's name already existed"));
    }
    next();
}));
