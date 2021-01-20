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
const User = { id: null };

function Header({ mode, backButton, userID }) {
    const history = useHistory();
    const [user, setUser] = useState({ id: userID });
    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };
    client.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);

        switch (task) {
            case "setUser": {
                console.log("set user");
                setUser({ id: payload.id });
                User.id = payload.id;
                sendData(["getCards", { userID: user.id }]);
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
    return (
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
                    {/* <IconButton onClick={() => sendData(["Accountinterface_getUser", { userID: user.id }])}> */}
                    <IconButton>
                        <AccountCircleOutlinedIcon fontSize="large" className="header__icon" />
                    </IconButton>
                </Link>
            )}

            <Link to="/">
                <IconButton onClick={() => sendData(["getCards", { userID: user.id }])}>
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
                    <IconButton>
                        <ForumOutlinedIcon className="header__icon" fontSize="large" />
                    </IconButton>
                </Link>
            )}
        </div>
    );
}

export default Header;
