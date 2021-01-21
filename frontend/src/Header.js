import React, { useEffect, useState } from "react";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined"; //account button
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined"; //chat button
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined"; //return button
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined"; //return button
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone"; //main page button
import { Link, useHistory } from "react-router-dom";
import client from "./client";

function Header({ mode, backButton, userID }) {
    console.log("header: user", userID);
    const history = useHistory();
    const [user, setUser] = useState({ id: userID });
    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };
    client.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);

        switch (task) {
            case "initHeader": {
                console.log("init header user", payload);
                setUser(() => payload);
                break;
            }
            case "Accountsettup": {
                console.log("In Header");
                console.log("Accountsettup");
                console.log(payload[0]);
                //setUser({ id: payload.id });
                setUser(payload[0]);
                break;
            }
            case "initCard": {
                //setPeople(() => payload);
                console.log("Header accept");
                break;
            }
            default: {
                break;
            }
        }
    };
    var reloadMain = () => {
        sendData(["getUser", { userID: user.id }]);
        sendData(["getCards", { userID: user.id }]);
    };
    var reloadAccountinterface = async () => {
        await sendData(["getUser", { userID: user.id }]);
        await sendData(["Accountinterface_getUser", { userID: user.id }]);
    };
    return (
        <>
            <div className="header">
                {mode === "chat" ? (
                    <IconButton
                        onClick={() => {
                            history.replace(backButton);
                            reloadMain();
                        }}
                    >
                        <ArrowBackIosOutlinedIcon fontSize="large" className="header__icon" />
                    </IconButton>
                ) : (
                    <Link to="/accounts">
                        <IconButton onClick={() => sendData(["Accountinterface_getUser", { userID: user.id }])}>
                            {" "}
                            {/* 我的db裡有891206的id*/}
                            <AccountCircleOutlinedIcon fontSize="large" className="header__icon" />
                        </IconButton>
                    </Link>
                )}

                <Link to="/">
                    <IconButton onClick={() => reloadMain()}>
                        <FavoriteTwoToneIcon style={{ fontSize: 45 }} color="secondary" className="header__logo" />
                    </IconButton>
                </Link>

                {mode === "account" ? (
                    <IconButton
                        onClick={() => {
                            history.replace(backButton);
                            reloadMain();
                        }}
                    >
                        <ArrowForwardIosOutlinedIcon fontSize="large" className="header__icon" />
                    </IconButton>
                ) : (
                    <Link to="/chats">
                        <IconButton
                            onClick={() => {
                                sendData(["chat_getUser", { userID: user.id }]);
                            }}
                        >
                            <ForumOutlinedIcon className="header__icon" fontSize="large" />
                        </IconButton>
                    </Link>
                )}
            </div>
            <p>{userID}</p>
        </>
    );
}

export default Header;
