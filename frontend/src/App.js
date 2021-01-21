import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import client from "./client";
import Accountinterface from "./container/accountinterface/accountinterface";
//import Useriinfo from "./container/userinfo/userinfo";
import Chatscreen from "./container/chatscreen/chatscreen";
//import Uploadimagetest from "./container/uploadimagetest/uploadimagetest"; //用不到

import Loginpage from "./container/login/loginipage/loginpage";
import Signuppage from "./container/login/signuppage/signuppage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Card from "./container/card/Card";

function App() {
    const [user, setUser] = useState({});
    client.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);

        switch (task) {
            case "setAppUser": {
                console.log("set user");
                setUser(payload[0]);
                break;
            }
            default: {
                break;
            }
        }
    };
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/chats">
                        <Header mode="chat" backButton="/" userID={user.id} />
                        <Chatscreen />
                    </Route>
                    <Route path="/accounts">
                        <Header mode="account" backButton="/" userID={user.id} />
                        <Accountinterface user={user} />
                    </Route>

                    <Route exact path="/">
                        <Header mode="main" backButton="" userID={user.id} />
                        <Card userID={user.id} />
                    </Route>

                    <Route exact path="/loginpage">
                        <Loginpage />
                    </Route>

                    <Route exact path="/signuppage">
                        <Signuppage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
