"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    address: { type: String }
});
const user = (0, mongoose_1.model)('user', UserSchema);
exports.default = user;
