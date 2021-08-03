import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { Provider } from "react-redux";
// import store from "./store";

ReactDOM.render(
  // <Provider store={store}>
  <App />,
  // {/* </Provider>, */}
  document.getElementById("root")
);

// ReactDOM.hydrate(<App />, document.getElementById("root"));

reportWebVitals();