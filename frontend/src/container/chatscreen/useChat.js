import { useState } from "react";
// import { w3cwebsocket as W3CWebSocket } from 'websocket'

// const client = new W3CWebSocket('ws://localhost:4000')
const client = new WebSocket("ws://localhost:4000");

const useChat = (User) => {
    const [user, setUser] = useState(User);
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [opened, setOpened] = useState(false);

    // const chatuser1 = { id:"3"}
    // const chatuser2 = { id:"891206"}
    // const chatuser3 = { id: "123"}

    //const [fromId, setFromId] = useState(user.id);

    client.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);
        //console.log(task, payload)
        switch (task) {
            case "status": {
                setStatus(payload);
                //console.log('status')
                break;
            }
            case "cleared": {
                //console.log('cleared')
                setMessages([]);
                break;
            }

            default:
                break;
        }
    };

    const sendData = (data) => {
        // TODO
        client.send(JSON.stringify(data));
    };

    const sendMessage = (msg) => {
        sendData(["messageInput", msg]);
    };

    //console.log('frontend intoChat 1')
    client.onopen = () => {
        //console.log('frontend intoChat 2')
        setOpened(true);
        sendData(["intoChat", { msg: "intoChatInit" }]);
    };

    const clearMessages = () => {
        // TODO
        client.send(JSON.stringify(["clear", ""]));
    };

    return {
        status,

        clearMessages,
    };
};

export default useChat;
