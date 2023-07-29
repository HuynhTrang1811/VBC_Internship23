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
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./src/app"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const RentNFT_model_1 = __importDefault(require("./src/models/RentNFT.model"));
const server = http_1.default.createServer(app_1.default);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
dotenv_1.default.config();
const URL_DB = process.env.DATABASE;
if (URL_DB === null || URL_DB === void 0 ? void 0 : URL_DB.includes('<PASSWORD>')) {
    URL_DB.replace('<PASSWORD>', process.env.PASSWORD);
}
const connectionParam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default
    .connect(URL_DB, connectionParam)
    .then(() => console.log('Connect DB sucessfully'))
    .catch(() => console.log('Fail to connect DB'));
const port = process.env.PORT || 8000;
const user = {};
exports.io.on('connection', (socket) => {
    socket.on('update', () => {
        exports.io.emit('update');
    });
    socket.on('connection', ({ walletAddress }) => {
        user[walletAddress] = socket.id;
    });
    socket.on('user', ({ walletAddress }) => {
        if (user[walletAddress]) {
            exports.io.to(user[walletAddress]).emit('user');
        }
    });
});
app_1.default.use((0, cors_1.default)({
// origin: 'http://localhost:3001', // Cho phép yêu cầu từ trang web chạy trên cổng 3001
// origin: 'http://192.168.1.3:3001', // Cho phép yêu cầu từ trang web chạy trên cổng 3001
// methods: ['GET', 'POST', 'PUT', 'DELETE'], // Cho phép các phương thức yêu cầu này
// credentials: true, // Cho phép chia sẻ thông tin xác thực (cookies, HTTP authentication) qua CORS
}));
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const expiredRentNfts = yield RentNFT_model_1.default.find({ endTime: { $lte: currentDate }, end: false });
    const expiredNftIds = expiredRentNfts.map((nft) => {
        // nft.
        const minter = user[nft.minter];
        const renter = user[nft.renter];
        if (minter)
            exports.io.to(minter).emit('user');
        if (renter)
            exports.io.to(renter).emit('user');
        return nft._id;
    });
    console.log(expiredNftIds);
    yield RentNFT_model_1.default.updateMany({ _id: { $in: expiredNftIds } }, { $set: { end: true } });
}), 20000);
