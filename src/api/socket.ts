import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://tokenrental.vbchain.vn/api';

export const socket = io(URL);