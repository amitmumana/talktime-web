import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:4040");

export default socket;
