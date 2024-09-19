import dataBaseServices from "@/app/appwrite/database";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CommentData = {
    blogId: string;
    userId: string;
    comment: string;
    createdAt: string;
}
interface CommentState {
    blogId: string;
    userId: string;
    comment: string;
    createdAt: string;
    loading: boolean;
    error: string | null;
}

const initialState: CommentState = {
    blogId: '',
    userId: '',
    comment: '',
    createdAt: '',
    loading: false,
    error: null,
};

export const addCmnt = createAsyncThunk(
    'comment/addCmnt',
    async({blogId, userId, comment, createdAt}: CommentData)=>{
        const response = await dataBaseServices.addComment({blogId, userId, comment, createdAt});

        return response;
    }
)

const commentSlice = createSlice({
    name: 'comment',   
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCmnt.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addCmnt.fulfilled, (state, {payload}) => {
            state.blogId = payload?.blogId;
            state.userId = payload?.userId;
            state.comment = payload?.comment;
            state.createdAt = payload?.createdAt;
            state.loading = false;
        })
        .addCase(addCmnt.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
        });
    }
});

export default commentSlice.reducer;
