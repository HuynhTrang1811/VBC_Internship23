"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./src/app"));
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
app_1.default.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
app_1.default.use((0, cors_1.default)({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Cho phép chia sẻ thông tin xác thực (cookies, HTTP authentication) qua CORS
}));
