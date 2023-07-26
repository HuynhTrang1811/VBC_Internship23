"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const signInDTO = {
    [celebrate_1.Segments.BODY]: {
        email: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
    }
};
const signUpDTO = {
    [celebrate_1.Segments.BODY]: {
        fullname: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().required(),
    }
};
exports.default = {
    signInDTO,
    signUpDTO
};
