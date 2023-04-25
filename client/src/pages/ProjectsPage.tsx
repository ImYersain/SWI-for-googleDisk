import axios from '../utils/axios';
import React, {useCallback, useEffect, useState} from 'react';
import {IProject} from '../types/project';
import {ProjectItem} from '../components/ProjectItem';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const allMyProjects = useSelector((state: RootState) => state.project.projects);
  const userName = useSelector((state: RootState) => state.auth.user?.username);
  const [onlyMyProjects, setOnlyMyProjects] = useState<Array<IProject>>([]);

  // useEffect(() => {
  //   const fetchMyProjects = async () => {
  //   try {
  //   const { data } = await axios.get('/projects/user/me');
  //   setProjects(data);
  //   } catch (error) {
  //   console.log(error);
  //   }
  //   };
    
  //   fetchMyProjects();
  //   }, []);

  const fetchMyProjects = useCallback(async () => {
    try {
    const {data} = await axios.get('/projects/user/me');
    setProjects(data);
    } catch (error) {
    console.log(error);
    }
    }, [setProjects]);
    
  useEffect(() => {
  fetchMyProjects();
  const filteredProjects = allMyProjects.filter(project => project.team.includes(userName as string));
  setOnlyMyProjects(filteredProjects);
  }, [fetchMyProjects, allMyProjects, userName]);
    

  // if (!projects.length && !onlyMyProjects.length) {
  //   return <div className="text-xl text-center text-white py-10">No projects yet</div>;
  // }

  return (
    <div className="w-1/2 mx-auto py-10 flex-col gap-10">
      {projects.map((project, i) => (
        <div className="mb-10">
          <ProjectItem key={i} project={project} />
        </div>
      ))}

      {onlyMyProjects.map((project, i) => <div><ProjectItem key={i} project={project} /></div>)}
    </div>
  );
};
