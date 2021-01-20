import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Chatscreen  from "./container/chatscreen/chatscreen"

import client from "./client";
import Accountinterface from "./container/accountinterface/accountinterface";
import Useriinfo from "./container/userinfo/userinfo";

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
            case "setUser": {
                console.log("set user");
                setUser({ id: payload.id });
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
                    <Route path="/chats/:person">
                        <Header mode="chat" backButton="/chats" userID={user.id} />
                    </Route>

                    <Route path="/chats">
                        <Header mode="chat" backButton="/" userID={user.id} />
                        <Chatscreen user={user}/>
                    </Route>
                    <Route path="/accounts">
                        <Header mode="account" backButton="/" userID={user.id} />
                        <Accountinterface />
                    </Route>
                    

                    <Route exact path="/">
                        <Header />
                        <Card userID={user.id} />
                    </Route>

                    <Route path="/userinfo">
                        <Header mode="account" backButton="/" userID={user.id} />
                        <Useriinfo />
                    </Route>

                    <Route exact path="/loginpage">
                        <Header mode="account" backButton="/" userID={user.id} />
                        <Loginpage />
                    </Route>

                    <Route exact path="/signuppage">
                        <Header mode="account" backButton="/" userID={user.id} />
                        <Signuppage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
