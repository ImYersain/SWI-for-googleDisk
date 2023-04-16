import React, { useEffect } from 'react';
import { Layout } from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { MainPage } from './pages/MainPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectPage } from './pages/ProjectPage';
import { AddProjectPage } from './pages/AddProjectPage';
import { EditProjectPage } from './pages/EditProjectPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { getMe } from './redux/features/auth/authSlice';
import { AddStudentList } from './pages/AddStudentList';
import StudentsList from './pages/StudentsList';


function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getMe())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout >
      <Routes>
        <Route path='/projects' element={<ProjectsPage />}/>
        <Route path='/:id' element={<ProjectPage />}/>
        <Route path='/:id/edit' element={<EditProjectPage />}/>
        <Route path='/new' element={<AddProjectPage />}/>
        <Route path='/studentlist' element={<AddStudentList />}/>
        <Route path='/students' element={<StudentsList />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/home' element={<MainPage />} />
        <Route path='/' element={<MainPage />} />
      </Routes>

      <ToastContainer position='bottom-right' />
    </Layout>
  );
}

export default App;
