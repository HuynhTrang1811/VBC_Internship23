import axios from 'axios'
import io from "socket.io-client";
import { URL } from '../constants/constants';
export default axios.create({
  baseURL: URL + '/api', 
  // withCredentials: true,
})