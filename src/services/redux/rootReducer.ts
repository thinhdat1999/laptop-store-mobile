  
import { combineReducers } from "@reduxjs/toolkit";
import messageSlice from "./slices/messageSlice";
import titleSlice from "./slices/titleSlice";
import userSlice from "./slices/userSlice";
import loaderStatusSlice from "./slices/loaderStatusSlice";


const rootReducer = combineReducers({
    message: messageSlice,
    title: titleSlice,
    loaderStatus: loaderStatusSlice,
    user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;