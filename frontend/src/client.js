import { w3cwebsocket as W3CWebSocket } from "websocket";
const host = "wss://fake-fake-tinder.herokuapp.com/";
const client = new W3CWebSocket(host);

export default client;
