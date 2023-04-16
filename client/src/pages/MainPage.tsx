import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PopularProject } from '../components/PopularProject';
import { ProjectItem } from '../components/ProjectItem';
import { checkIsAuth } from '../redux/features/auth/authSlice';
import { getAllProjects } from '../redux/features/project/projectSlice';
import { AppDispatch, RootState } from '../redux/store';

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, popularProjects, loading } = useSelector((state: RootState) => state.project);
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

 // if(!isAuth) navigate('/login');  //описать в бп что с помощью этого нельзя бегать по урл не авторизованным
  
  if (!projects.length) {
    return <div className="text-xl text-center text-white py-10">No projects yet</div>;
  }

  if (loading) {
    return <div className="text-xl text-center text-white py-10">Loading...</div>;
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {projects?.map((project, i) => (
            <ProjectItem key={i} project={project} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Popular Projects:</div>

          {popularProjects.map((project, i) => (
            <PopularProject key={i} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};
