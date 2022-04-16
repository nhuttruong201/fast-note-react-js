import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import noteReducer from "./redux/reducers/noteReducer";
import reportWebVitals from "./reportWebVitals";

const store = createStore(noteReducer);

ReactDOM.render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>,
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById("root")
);

reportWebVitals();
