import { combineReducers } from "redux";


import mentorReducer from "./mentor";
import apprentiReducer from "./apprenti";

export default combineReducers({
    mentorReducer,
    apprentiReducer
});