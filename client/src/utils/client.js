import {io} from "socket.io-client";

localStorage.debug = 'socket.io-client:socket'
console.log("clientjs loaded")

const socket = io('http://localhost:3000')

export default socket;
