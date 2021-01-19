import React from "react";
import "./Header.css";



import IconButton from "@material-ui/core/IconButton";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined"; //account button
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined"; //chat button
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined"; //return button
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined"; //return button
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone"; //main page button

import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';// setting button

import { Link, useHistory } from "react-router-dom";

function Header({ mode, backButton }) {
    const history = useHistory();
    return (
        <div className="header">
            
            {mode === "chat" ? (
                <IconButton onClick={() => history.replace(backButton)}>
                    <ArrowBackIosOutlinedIcon fontSize="large" className="header__icon" />
                </IconButton>
            ) : (
                <Link to="/accounts">
                    <IconButton>
                        <AccountCircleOutlinedIcon fontSize="large" className="header__icon" />
                    </IconButton>
                </Link>
            )}

            <Link to="/">
                <IconButton>
                    <FavoriteTwoToneIcon style={{ fontSize: 45 }} color="secondary" className="header__logo" />
                </IconButton>
            </Link>

            {mode === "account" ? (
                <IconButton onClick={() => history.replace(backButton)}>
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
