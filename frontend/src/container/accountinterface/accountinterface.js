import { useCallback, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router";

import "./accountinterface.css";
import IconButton from "@material-ui/core/IconButton";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded"; // setting button
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Userinfo from "./userinfo";

//const client = new WebSocket("ws://localhost:4000");
import client from "../../client";

var isLogin = true;

function Accountinterface(props) {
    const [imagebuffer, setImagebuffer] = useState(null);
    const [testid, setTestid] = useState("00000000"); //for broadcasttest
    //const [user,setUser] = useState({id:"",name:"",photo:"",sex:"",password:""})
    const [user, setUser] = useState(props.user);

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };

    client.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);

        switch (task) {
            case "Accountinterface_setUser": {
                isLogin = true;
                console.log("receive: Accountinterface_setUser");
                console.log(payload);
                console.log(payload[0]._id);

                //const { id, name, photo, sex ,password} = payload[0]; // {imagebuffer:image.buffer}
                //setUser({id:id,name:name,photo:photo,sex:sex,password:password})

                //setUser({id:id,name:name,photo:photo,sex:sex,password:password})
                setUser(payload[0]);
                //sendData(["initHeader", { userID: payload[0].id }]);

                break;
            }
            case "Accountinterface_updateUser": {
                console.log("receive: Accountinterface_updateUser");
                //console.log(payload)// is old one
                const { _id } = payload;

                //sendData(['Accountinterface_getUser',{ userID: }])

                //const { id, name, photo, sex ,password} = payload[0]; // {imagebuffer:image.buffer}
                //setUser({id:id,name:name,photo:photo,sex:sex,password:password})

                //setUser({id:id,name:name,photo:photo,sex:sex,password:password})
                //setUser(payload[0])

                break;
            }
            case "Image": {
                console.log("receive: Image");
                const { imagebuffer } = payload; // {imagebuffer:image.buffer}
                setImagebuffer(imagebuffer);

                break;
            }
            case `broadcast${testid}`: {
                console.log(`receive: broadcast${testid}`);
                const { id, body } = payload;
                console.log(payload);

                break;
            }
        }
    };

    const sendtest = () => {
        //console.log('sendtest: { id: "fromid", body:"testbody"}')
        //console.log('sendtest: { userID: "891206"}');
        sendData(["Accountinterface_getUser", { userID: user.id }]);
    };
    // const sendtest2 = () => {
    //     console.log('sendtest2: { id: "fromid", body:"testbody"}')
    //     sendData(['sendtest',{ id: testid, body:"testbody"}])
    // }

    // var Hi_url = "60040f3741ef153e7cd5e71f";
    // //sendData(['getImageByID',{_id: Hi_url}])
    // const getphoto = async () => {
    //     sendData(["getImageByID", { ImageID: Hi_url }]);
    //     console.log(imagebuffer);
    // };

    return (
        <div>
            {isLogin ? (
                <div className="App-accountinterface card-box">
                    <div className="profile">
                        {/*imagebuffer? <img src={imagebuffer} className='rounded mx-auto d-block' alt='figure' /> : null*/}
                    </div>
                    <br></br>
                    <Userinfo user={user} />
                    <br></br>
                    <div className="setting">
                        <Link to="/loginpage">
                            <button className="btn-one" type="submit">
                                Log Out
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="card-box">
                    <h3>PLEASE LOGIN!!</h3>
                    <br></br>
                    <Link to="/loginpage">
                        <button className="btn-one" type="submit">
                            Login
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Accountinterface;

// <div className="settinglist">
// <ul className="todo-app__list" id="todo-list">
//     <li className="todo-app__item">
//             <h1 id="header_one_0" className="todo-app__item-detail">
//                 Name
//             </h1>
//             <h2> {user.name}</h2>
//             <Link to="/">
//                 <IconButton>
//                     <KeyboardArrowRightIcon style={{ fontSize: 30 }} className="header__logo" />
//                 </IconButton>
//             </Link>

//     </li>
//     <li className="todo-app__item">
//             <h1 id="header_one_0" className="todo-app__item-detail">
//                 Sex
//             </h1>
//             <h2> {user.sex}</h2>
//     </li>
//     <li className="todo-app__item">
//             <h1 id="header_one_0" className="todo-app__item-detail">
//                 ID
//             </h1>
//             <h2> {user.id}</h2>
//     </li>
//     <li className="todo-app__item">
//             <h1 id="header_one_0" className="todo-app__item-detail">
//                 Password
//             </h1>
//             <h2> {user.password}</h2>
//     </li>

// </ul>
// </div>
