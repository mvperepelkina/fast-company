import React from "react";
import NavBar from "./navBar";
import { Route, Switch } from "react-router-dom";
import Main from "../layouts/main";
import Login from "../layouts/login";
import UsersLayout from "../layouts/users";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />;
                <Route path="/login" component={Login} />;
                <Route path="/users/:userId?" component={UsersLayout} />;
            </Switch>
        </div>
    );
}

export default App;
