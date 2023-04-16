import { IComment } from './../../../types/comment';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';


interface InitialStateType {
    comments: Array<IComment>,
    loading: boolean
}
const initialState: InitialStateType = {
    comments: [],
    loading: false
}


export const createComment = createAsyncThunk<IComment, any, any>(
    'comment/createComment', 
     async ({projectId, comment, author}) => {
        try {
            const {data} = await axios.post(`comments/${projectId}`, {
                projectId,
                comment,
                author
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)


export const getProjectComments = createAsyncThunk<Array<IComment>, any, any>(
    'comment/getProjectComments',
    async (projectId) => {
        try {
            const {data} = await axios.get(`/projects/comments/${projectId}`)
            return data;
        } catch (error) {
            console.log(error)
        }
    }
)


export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //create comment
            .addCase(createComment.pending, (state) => {
                state.loading = true
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false
                state.comments.push(action.payload)
            })
            .addCase(createComment.rejected, (state) => {
                state.loading = false
            })
            //get all comments
            .addCase(getProjectComments.pending, (state) => {
                state.loading = true
            })
            .addCase(getProjectComments.fulfilled, (state, action) => {
                state.loading = false
                state.comments = action.payload
            })
            .addCase(getProjectComments.rejected, (state) => {
                state.loading = false
            })
    }
});

export default commentSlice.reducer;