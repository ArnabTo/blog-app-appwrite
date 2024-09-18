import dataBaseServices from "@/app/appwrite/database";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Comment {
    blogId: string;
    userId: string;
    content: string;
    createdAt: string;
    parentCommentId: string | null;
}

interface CommentState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null
}

// thunk to fetch comments
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (blogId: string) => {
        try {
            const response = await dataBaseServices.getComments(blogId);
            if (response) {
                return response.documents
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }
)
// thunk to add new comment
export const addComment = createAsyncThunk(
    'comment/addComment',
    async ({ blogId, userId, content, createdAt, parentCommentId }: Comment) => {
        try {
            const response = await dataBaseServices.addComment({ blogId, userId, content, createdAt, parentCommentId });
            if (response) {
                return response
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }
)

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchComments.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload as unknown as Comment[];
            state.loading = false;
          })
          .addCase(fetchComments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch comments';
          })
          .addCase(addComment.fulfilled, (state, action) => {
            state.comments.push(action.payload as unknown as Comment[][0]);
          });
    },
});

export default commentSlice.reducer;