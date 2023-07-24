"use strict";
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
const server = http_1.default.createServer(app_1.default);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const cors_1 = __importDefault(require("cors"));
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
exports.io.on('connection', (socket) => {
    socket.on('update', () => {
        exports.io.emit('update');
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
// app.listen(port, () => {
//     console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });
