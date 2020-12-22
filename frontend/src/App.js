import React from "react";
import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
                    </Route>
                    <Route path="/">
                        <Header />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
