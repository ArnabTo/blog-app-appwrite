import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dataBaseServices from '@/app/appwrite/database';

interface BlogSupportState {
    loading: boolean;
    error: string | null;
}

const initialState: BlogSupportState = {
    loading: false,
    error: null,
};

export const updateSupport = createAsyncThunk(
    'blogSupport/updateSupport',
    async ({ id, updatedSupports }: { id: string; updatedSupports: number }) => {
        const response = await dataBaseServices.updateSupport(id, updatedSupports);

        return response.supports;
    }
);

const blogSupportSlice = createSlice({
    name: 'blogSupport',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateSupport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSupport.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateSupport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default blogSupportSlice.reducer;