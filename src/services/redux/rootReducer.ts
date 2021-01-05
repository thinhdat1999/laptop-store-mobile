import { combineReducers } from "@reduxjs/toolkit";
import messageSlice from "./slices/messageSlice";
import titleSlice from "./slices/titleSlice";
import userSlice from "./slices/userSlice";
import loaderStatusSlice from "./slices/loaderStatusSlice";
import wishListSlice from "./slices/wishListSlice";

const rootReducer = combineReducers({
    message: messageSlice,
    title: titleSlice,
    loaderStatus: loaderStatusSlice,
    user: userSlice,
    wishList: wishListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;