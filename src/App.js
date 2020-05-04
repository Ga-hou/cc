import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
import { createBrowserHistory } from "history";
import Auth from "./components/Auth/Auth";
import Admin from "./layout/Admin";
import OnLine from "./layout/OnLine";
import Login from "./layout/Login";
import Agent from "./layout/Agent";
import { store } from "./store";
import "./App.css";
import { IMWithCard as IM } from "./views/User/IM/IM";
import WebRTC from "./views/WebRTC/WebRTC";

const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Auth>
          {({ auth }) => {
            return auth ? (
              <Switch>
                <Route path={"/online"} component={OnLine} />
                <Route path={"/user"} component={Agent} />
                <Route path={"/admin"} component={Admin} />
                <Route path={"/login"} component={Login} />
                <Route path={"/im"} component={IM} />
                <Route path={"/webrtc"} component={WebRTC} />
                <Redirect from={"/"} to={"/online"} />
              </Switch>
            ) : (
              <Switch>
                <Route path={"/login"} component={Login} />
                <Redirect
                  to={{
                    pathname: "/login"
                  }}
                />
              </Switch>
            );
          }}
        </Auth>
      </Router>
    </Provider>
  );
}

export default hot(module)(App);
