import { combineReducers } from "redux";


import mentorReducer from "./mentor";
import apprentiReducer from "./apprenti";
import adminReducer from "./admin";


export default combineReducers({
    mentorReducer,
    apprentiReducer,
    adminReducer,
});