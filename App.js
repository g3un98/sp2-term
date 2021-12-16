import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import App from "./src/containers/App";

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
