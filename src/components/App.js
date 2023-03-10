import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "../layouts/main";
import Login from "../layouts/login";
import UsersLayout from "../layouts/users";
import NavBar from "./ui/navBar";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />;
                <Route path="/login/:type?" component={Login} />;
                <Route path="/users/:userId?/:edit?" component={UsersLayout} />;
            </Switch>
        </div>
    );
}

export default App;
