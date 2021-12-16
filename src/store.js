import { createStore, applyMiddleware } from "redux";
import modules from "./modules";
import thunk from "redux-thunk";

const store = createStore(modules, applyMiddleware(thunk));

export default store;
