import React from "react";
import "./App.css";
import Header from "./Header";

import Accountinterface from "./container/accountinterface/accountinterface";
import Useriinfo from "./container/userinfo/userinfo";

import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import Card from "./Card";
var open = false;

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
                </Switch>
            </Router>
        </div>
    );
}

export default App;
