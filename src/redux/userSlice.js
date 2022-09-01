import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        users: {
            allUsers: null,
            isFeching: false,
            error: false,
        },
        msg: ""
    },
    reducers:{
        getUsersStart: (state) => {
            state.users.isFeching = true
        },
        getUsersSuccess: (state, action) => {
            state.users.isFeching = false
            state.users.allUsers = action.payload
            state.users.error = false
        },
        getUsersFailed: (state) => {
            state.users.isFeching = false
            state.users.error = true
        },
        deleteUserStart: (state) => {
            state.users.isFeching = true
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFeching = false
            state.users.error = false
            state.msg = action.payload
        },
        deleteUserFailed: (state, action) => {
            state.users.isFeching = false
            state.users.error = true
            state.msg = action.payload
        },
    }
        
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
} = userSlice.actions;

export default userSlice.reducer;