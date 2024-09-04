import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface User {
    name: string;
    email: string;
    avatar: string;
}

const initialState: User = {
    name: '',
    email: '',
    avatar: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<User>) {
            state.name = action.payload.name
            state.email = action.payload.email
            state.avatar = action.payload.avatar
        },
        clearUserData(state) {
            state.name = ''
            state.email = ''
            state.avatar = ''
        }
    }
})

export const { setUserData, clearUserData } = userSlice.actions
export default userSlice.reducer