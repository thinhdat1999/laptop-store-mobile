  
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const titleSlice = createSlice({
    name: "title",
    initialState: "",
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { setTitle } = titleSlice.actions;

export default titleSlice.reducer;