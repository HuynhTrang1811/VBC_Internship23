"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const compression_1 = __importDefault(require("compression"));
const nft_route_1 = __importDefault(require("./routes/nft.route"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.enable('trust proxy');
app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3001' }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, helmet_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);
app.use(express_1.default.json({ limit: '10kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use('/api/route', nft_route_1.default);
app.get('*', (req, res) => {
    res.send('Express + TypeScript Server');
});
exports.default = app;
