import React from "react";
import "./App.css";
import Header from "./Header";

import Accountinterface from "./container/accountinterface/accountinterface"
import Useriinfo from "./container/userinfo/userinfo"
import Chatscreen  from "./container/chatscreen/chatscreen"


import Loginpage from "./container/login/loginipage/loginpage";
import Signuppage from "./container/login/signuppage/signuppage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Card from "./container/card/Card";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/chats/:person">
                        <Header mode="chat" backButton="/chats" />
                    </Route>
                    <Route path="/chats">
                        <Header mode="chat" backButton="/" />
                        <Chatscreen/>
                    </Route>
                    <Route path="/accounts">
                        <Header mode="account" backButton="/" />
                        <Accountinterface />
                    </Route>

                    <Route exact path="/">
                        <Header />
                        <Card />
                    </Route>

                    <Route path="/userinfo">
                        <Useriinfo />
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
