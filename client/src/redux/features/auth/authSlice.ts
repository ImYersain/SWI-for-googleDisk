import { RootState } from './../../store';
import { IUser } from './../../../types/user';
import { IAuth } from './../../../types/auth';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../utils/axios';


interface InitialStateType {
    user: IUser | null,
    token: string | null,
    isLoading: boolean,
    status?: string | null
}

const initialState: InitialStateType = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

export const registerUser = createAsyncThunk<IAuth, IUser, {rejectValue : IAuth}>(
    'auth/registerUser',
    async ({username, studentname, studentlastname, password}) => {
        try {
            const {data} = await axios.post('auth/register', {
                username,
                studentname,
                studentlastname,
                password
            })
            if(data.token){
                window.localStorage.setItem('token', data?.token);
            }

            return data;
        } catch (error) {
            console.log(error);
        }
    }
)


export const loginUser = createAsyncThunk<IAuth, IUser, {rejectValue : IAuth}>(
    'auth/loginUser',
    async ({username, password}) => {
        try {
            const {data} = await axios.post('auth/login', {
                username,
                password
            })
            if(data.token){
                window.localStorage.setItem('token', data?.token);
            }

            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getMe = createAsyncThunk<IAuth, void, {rejectValue : IAuth}>(
    'auth/getMe',
    async (data) => {
        try {
            const {data} = await axios.get('auth/me');
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null 
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: (builder) => {
        builder
            //register
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.message;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.status = action.payload?.message;
            })
            //login
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.message;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.status = action.payload?.message;
            })
            //Get me, check to authorization
            .addCase(getMe.pending, (state, action) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = null;
                state.user = action.payload?.user;
                state.token = action.payload?.token;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.status = action.payload?.message;
            })
    }
})

export const checkIsAuth = (state: RootState) => Boolean(state.auth.token);
export const {logout} = authSlice.actions;
export default authSlice.reducer;