import { IProject, ICreateProject, IGetAllProjects } from './../../../types/project';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../utils/axios';

interface InitialStateType {
    projects: Array<IProject>,
    popularProjects: Array<IProject>,
    loading: boolean,
    status?: string | null
}

const initialState: InitialStateType = {
    projects: [],
    popularProjects: [],
    loading: false,
    status: null
}


export const createProject = createAsyncThunk<ICreateProject, any,  {rejectValue : ICreateProject}>(
    'project/createProject', 
    async(params) => {
    try {
        const {data} = await axios.post('/projects', params)
        return data
    } catch (error) {
        console.log(error);
    }
})


export const getAllProjects = createAsyncThunk<IGetAllProjects, void, {rejectValue : IGetAllProjects}>(
    'projects/getAllProjects',
    async () => {
        try {
            const {data} = await axios.get('/projects')
            return data
        } catch (error) {
            console.log(error);
        }
    }
)


export const removeProject = createAsyncThunk<any, any, {rejectValue : any}>(
    'project/removeProject',
    async (id) => {
        try {
            const {data} = await axios.delete(`/projects/${id}`, id);
            return data
        } catch (error) {
            console.log(error);
        }
    }
)


export const updateProject = createAsyncThunk<IProject, any, {rejectValue : ICreateProject}>(  //первый тип то что нам возвращается с бэка, второй то что мы аргументом отправляем при запросе
    'project/updateProject',
    async (updatedProject) => {
        try {
            const {data} = await axios.put(`/projects/${updatedProject.id}`, updatedProject);
            return data
        } catch (error) {
            console.log(error);
        }
    }
)


export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
             // Create project
            .addCase(createProject.pending, (state) => {
                state.loading = true
                state.status = null
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false
                state.projects.push(action.payload.project)
                state.status = action.payload.message
            })
            .addCase(createProject.rejected, (state) => {
                state.loading = false
                state.status = null
            })
            //  Get all projects
            .addCase(getAllProjects.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllProjects.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload.projects
                state.popularProjects = action.payload.popularProjects
            })
            .addCase(getAllProjects.rejected, (state) => {
                state.loading = false
            })
            //  Remove project
            .addCase(removeProject.pending, (state) => {
                state.loading = true
            })
            .addCase(removeProject.fulfilled, (state, action) => {
                state.loading = false
                state.projects = state.projects.filter(project => project._id !== action.payload.id)  //написать про иммутабельность
            })
            .addCase(removeProject.rejected, (state) => {
                state.loading = false
            })
             //  Update project
             .addCase(updateProject.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false
                const index = state.projects.findIndex(project => project._id === action.payload._id)
                state.projects[index] = action.payload
            })
            .addCase(updateProject.rejected, (state) => {
                state.loading = false
            })
    }
       
        
    
})


export default projectSlice.reducer