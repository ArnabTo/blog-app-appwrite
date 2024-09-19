import dataBaseServices from "@/app/appwrite/database";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CommentData = {
    blogId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    comment: string;
    createdAt: string;
}
interface CommentState {
    blogId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    comment: string;
    createdAt: string;
    loading: boolean;
    error: string | null;
}

const initialState: CommentState = {
    blogId: '',
    userId: '',
    userName: '',
    userAvatar: '',
    comment: '',
    createdAt: '',
    loading: false,
    error: null,
};

// export const addCmnt = createAsyncThunk(
//     'comment/addCmnt',
//     async({blogId, userId, comment, createdAt, userName, userAvatar}: CommentData)=>{
//         const response = await dataBaseServices.addComment({blogId, userId, userName, userAvatar ,comment, createdAt});

//         return response;
//     }
// )

export const addCmnt = createAsyncThunk(
    'comment/addCmnt',
    async({blogId, userId, comment, createdAt, userName, userAvatar}: CommentData)=>{
        console.log(userName)
        const response = await dataBaseServices.addComment({blogId, userId, userName, userAvatar ,comment, createdAt});
        console.log(userName)
        return response;
    }
)

export const fetchBlogs = createAsyncThunk(
    'comment/fetchBlogs',
    async()=>{
        const response = await dataBaseServices.getBlogsData();
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
            state.userName = payload?.userName;
            state.userAvatar = payload?.userAvatar;
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
