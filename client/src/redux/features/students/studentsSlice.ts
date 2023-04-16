import { RootState } from './../../store';
import { IUser } from './../../../types/user';
import { IAuth } from './../../../types/auth';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../utils/axios';


interface InitialStateType {
    students: string[] | null
}

const initialState: InitialStateType = {
    students: null
}

// export const addStudentsList = (students: any) => {
//     initialState.students = students;
// };

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudents(state, action) {
            state.students = action.payload
        }
    }
})

export const { addStudents } = studentsSlice.actions;
export default studentsSlice.reducer;