import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

import app from './src/app';
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors';
import RentNFT from './src/models/RentNFT.model'
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

dotenv.config();

const URL_DB = process.env.DATABASE as string;
if (URL_DB?.includes('<PASSWORD>')) {
    URL_DB.replace('<PASSWORD>', process.env.PASSWORD as string);
}
const connectionParam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions;

mongoose
    .connect(URL_DB, connectionParam)
    .then(() => console.log('Connect DB sucessfully'))
    .catch(() => console.log('Fail to connect DB'));

const port = process.env.PORT || 8000;

const user: any = {};
io.on('connection', (socket) => {
    socket.on('update', () => {
        io.emit('update')
    })
    socket.on('connection', ({ walletAddress }) => {
        user[walletAddress] = socket.id;
    })
    socket.on('user', ({ walletAddress }) => {
        if (user[walletAddress]) {
            io.to(user[walletAddress]).emit('user')
        }
    })
})

app.use(cors({
    // origin: 'http://localhost:3001', // Cho phép yêu cầu từ trang web chạy trên cổng 3001
    // origin: 'http://192.168.1.3:3001', // Cho phép yêu cầu từ trang web chạy trên cổng 3001
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Cho phép các phương thức yêu cầu này
    // credentials: true, // Cho phép chia sẻ thông tin xác thực (cookies, HTTP authentication) qua CORS
}));


server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

setInterval(async () => {
    const currentDate = new Date();
    const expiredRentNfts = await RentNFT.find({ endTime: { $lte: currentDate }, end: false })
    const expiredNftIds = expiredRentNfts.map((nft) => {
        // nft.
        const minter = user[nft.minter];
        const renter = user[nft.renter];
        if (minter) io.to(minter).emit('user');
        if (renter) io.to(renter).emit('user');
        return nft._id
    });
    console.log(expiredNftIds)
    await RentNFT.updateMany(
        { _id: { $in: expiredNftIds } },
        { $set: { end: true } },)

}, 20000)

