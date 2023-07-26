import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

import app from './src/app';
import http from 'http'
import {Server} from 'socket.io'
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

import cors from 'cors';
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

io.on('connection', (socket) => {
    socket.on('update', () => {
        io.emit('update')
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

// app.listen(port, () => {
//     console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });

