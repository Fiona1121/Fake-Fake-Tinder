import "./chatscreen.css";
import React, { useEffect, useRef, useState } from "react";
import useChat from "./useChat";
import { Button, Input, message, Tag } from "antd";
import client from "../../client";

function Chatscreen() {
    const [user, setUser] = useState({});
    const [body, setBody] = useState("");
    const [chatuserlist, setChatuserlist] = useState([]);
    const [messages, setMessages] = useState([]);
    const [opened, setOpened] = useState(false);
    const [toId, setToId] = useState("");

    const bodyRef = useRef(null);
    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };
    const sendMessage = (msg) => {
        sendData(["messageInput", msg]);
    };

    const getchatuserlist = () => {
        if (user !== undefined) {
            console.log("get chat user list");
            sendData(["getchatuserlist", { fromId: user.id }]);
        }
    };

    client.onopen = () => {
        //console.log('frontend intoChat 2')
        setOpened(true);
        sendData(["intoChat", { msg: "intoChatInit" }]);
    };
    const handleToidchange = (newid) => {
        //setChatuserid(newid)
        setToId(newid);
    };

    client.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "initMsg": {
                setMessages(() => payload);
                break;
            }
            case "resOfSendMessage": {
                setMessages((messages) => [...messages, ...payload]);

                break;
            }
            case "initChat": {
                console.log("init chatroom user", payload[0].id);
                setUser(payload[0]);
                sendData(["initHeader", { userID: payload[0].id }]);
                break;
            }
            case "initchatuserlist": {
                console.log("initchatuserlist");
                console.log(payload);
                setChatuserlist(payload);
            }

            case `broadcast${user.id}`: {
                setMessages((messages) => [...messages, ...payload]);

                break;
            }
            default:
                break;
        }
    };

    return (
        <div className="App-chatscreen">
            <button onClick={getchatuserlist}> getchatuserlist </button>

            <div className="App-title">
                <h1>Chat Room</h1>
            </div>

            <p> User Id : {user.id}</p>
            <p> To Id : {toId}</p>
            <div className="App-messages">
                {messages.length === 0 ? (
                    <p style={{ color: "#ccc" }}>{opened ? "No messages..." : "Loading..."}</p>
                ) : (
                    messages.map((message, i) =>
                        message.fromId === user.id ? (
                            <p className="App-message" key={i}>
                                <Tag color="blue">{user.id + ":"}</Tag> {message.body}
                            </p>
                        ) : (
                            <p className="App-message" key={i}>
                                <Tag color="blue">{message.fromId + ":"} </Tag> {message.body}
                            </p>
                        )
                    )
                )}
            </div>

            {/* <Input
        
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input> */}
            <div className="control">
                <select onChange={(e) => handleToidchange(e.target.value)}>
                    {chatuserlist.map((chatuser, i) => {
                        return <option key={i}>{chatuser.id}</option>;
                    })}
                </select>
            </div>

            <Input.Search
                rows={4}
                value={body}
                ref={bodyRef}
                enterButton="Send"
                onChange={(e) => setBody(e.target.value)}
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    // if (!msg || !username) {
                    //   displayStatus({
                    //     type: 'error',
                    //     msg: 'Please enter a username and a message body.'
                    //   })
                    //   return
                    // }

                    sendMessage({ fromId: user.id, toId: toId, body: body });
                    setBody("");
                }}
            ></Input.Search>
        </div>
    );
}

export default Chatscreen;
