import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "mobx-react";
import {RouterStore, startRouter} from "mobx-router";
import * as serviceWorker from "./serviceWorker";
import {App} from "./App";
import {store} from "./store";
import {Routes} from "./routes";

const routerStore = {
    router: new RouterStore()
};

startRouter(Routes, routerStore);

ReactDOM.render(
    <Provider store={routerStore} {...store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

if (localStorage.getItem("accessToken")) {
    store.authorization.fetchCurrentUser();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
