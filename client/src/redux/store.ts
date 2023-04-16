import projectSlice from './features/project/projectSlice';
import authSlice from './features/auth/authSlice';
import commentSlice from './features/comments/commentSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import studentsSlice from './features/students/studentsSlice';


const rootReducer = combineReducers({
    auth: authSlice,
    project: projectSlice,
    comment: commentSlice,
    //students: studentsSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']