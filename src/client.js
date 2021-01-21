import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket("ws://localhost:4000");

export default client;
