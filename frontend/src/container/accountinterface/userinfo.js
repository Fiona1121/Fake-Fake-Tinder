import { useState, useRef, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Link, useHistory } from "react-router-dom";
import "./userinfo.css";

import client from "../../client";

const Userinfo = (props) => {
    const { user } = props;
    const inputRef = useRef({});

    const [name, setName] = useState(user.name);
    const [sex, setSex] = useState(user.sex);
    const [id, setId] = useState(user.id);
    const [password, setPassword] = useState(user.password);

    useEffect(() => {
        setName(user.name);
        setSex(user.sex);
        setId(user.id);
        setPassword(user.password);
    }, [user]);

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
        if (info_be_setting === "name") {
            setName(infoinput);
        } else if (info_be_setting === "sex") {
            setSex(infoinput);
        } else if (info_be_setting === "password") {
            setPassword(infoinput);
        } else if (info_be_setting === "id") {
            setId(infoinput);
        }

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
                    <h2> {name}</h2>

                    <IconButton onClick={() => setinfo("name", user.name)}>
                        <KeyboardArrowRightIcon style={{ fontSize: 30 }} className="header__logo" />
                    </IconButton>
                </li>
                <li className="todo-app__item">
                    <h1 id="header_one_0" className="todo-app__item-detail">
                        Sex
                    </h1>
                    <h2> {sex}</h2>

                    <IconButton onClick={() => setinfo("sex", user.sex)}>
                        <KeyboardArrowRightIcon style={{ fontSize: 30 }} className="header__logo" />
                    </IconButton>
                </li>
                <li className="todo-app__item">
                    <h1 id="header_one_0" className="todo-app__item-detail">
                        ID
                    </h1>
                    <h2> {id}</h2>
                    <IconButton onClick={() => setinfo("id", user.id)}>
                        <KeyboardArrowRightIcon style={{ fontSize: 30 }} className="header__logo" />
                    </IconButton>
                </li>
                <li className="todo-app__item">
                    <h1 id="header_one_0" className="todo-app__item-detail">
                        Password
                    </h1>
                    <h2> {password}</h2>
                    <IconButton onClick={() => setinfo("password", user.password)}>
                        <KeyboardArrowRightIcon style={{ fontSize: 30 }} className="header__logo" />
                    </IconButton>
                </li>
            </ul>
        </div>
    );
};

export default Userinfo;
