import { useState, useRef } from "react";

import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Link, useHistory } from "react-router-dom";
import "./userinfo.css";

import client from "../../client";

const Userinfo = (props) => {
    const { user } = props;
    const inputRef = useRef({});

    const [info_be_setting, setInfo_be_setting] = useState("none");
    const [infoinput, setInfoinput] = useState("");
    const [placeholder, setPlaceholder] = useState("");

    const setinfo = (info, originalvalue) => {
        //info like: name, sex ...
        //console.log()                    // originvalue like: Toby,male
        setInfo_be_setting(info);
        setPlaceholder(originalvalue);
    };

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };
    const sendupdateinfo = (msg) => {
        sendData(["Accountinterface_updateUser", msg]);
    };

    const updateinfo = () => {
        //console.log(infoinput)
        console.log("updateinfo");

        sendupdateinfo({ user_id: user._id, id: user.id, infotobeupdate: info_be_setting, newvalue: infoinput });

        setInfo_be_setting("none");
    };

    return info_be_setting !== "none" ? (
        <div>
            <p> {info_be_setting} </p>
            <div className="App-userinfo">
                <input
                    style={{ display: "" }}
                    type="text"
                    value={infoinput}
                    onChange={(e) => setInfoinput(e.target.value)}
                    placeholder={placeholder}
                    ref={inputRef}
                />

                <button onClick={updateinfo}>upload</button>
            </div>
        </div>
    ) : (
        <div className="settinglist">
            <ul className="todo-app__list" id="todo-list">
                <li className="todo-app__item">
                    <h1 id="header_one_0" className="todo-app__item-detail">
                        Name
                    </h1>
                    <h2> {user.name}</h2>

                    <IconButton onClick={() => setinfo("name", user.name)}>
                        <KeyboardArrowRightIcon style={{ fontSize: 30 }} className="header__logo" />
                    </IconButton>
                </li>
                <li className="todo-app__item">
                    <h1 id="header_one_0" className="todo-app__item-detail">
                        Sex
                    </h1>
                    <h2> {user.sex}</h2>

                    <IconButton onClick={() => setinfo("sex", user.sex)}>
                        <KeyboardArrowRightIcon style={{ fontSize: 30 }} className="header__logo" />
                    </IconButton>
                </li>
                <li className="todo-app__item">
                    <h1 id="header_one_0" className="todo-app__item-detail">
                        ID
                    </h1>
                    <h2> {user.id}</h2>
                    <IconButton onClick={() => setinfo("id", user.id)}>
                        <KeyboardArrowRightIcon style={{ fontSize: 30 }} className="header__logo" />
                    </IconButton>
                </li>
                <li className="todo-app__item">
                    <h1 id="header_one_0" className="todo-app__item-detail">
                        Password
                    </h1>
                    <h2> {user.password}</h2>
                    <IconButton onClick={() => setinfo("password", user.password)}>
                        <KeyboardArrowRightIcon style={{ fontSize: 30 }} className="header__logo" />
                    </IconButton>
                </li>
            </ul>
        </div>
    );
};

export default Userinfo;
