import React from 'react';
import {AiFillEye, AiOutlineMessage} from 'react-icons/ai';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { IProject } from '../types/project';


interface IProjectItemProps {
    project: IProject
}

export const ProjectItem = ({project}:IProjectItemProps) => {
    if(!project){
        return (
            <div className='text-xl text-center text-white py-10'>
                Loading...
            </div>
        )
    }

    return (
    <Link className='mb-5' to={`/${project._id}`}>
        <div className='flex flex-col basis-1/4 flex-grow'>
        <div className={'flex rounded-sm h-80'}>
            {project.imgUrl ? <img src={`http://localhost:3007/${project.imgUrl}`} alt='img' className='object-cover w-full' /> :
            <img src={'https://lms.pb.edu.bn/vle/sict/pluginfile.php/16462/course/overviewfiles/project.png'} alt='img' className="object-cover w-full" />}
        </div>
        <div className='flex justify-between items-center pt-2'>
            <div className='text-xs text-black'><b>Created: {project.username}</b></div>
            <div className='text-xs text-black'>
                <b><Moment date={project.createdAt} format='D MMM YYYY'/></b>
            </div>
        </div>

        <div className='text-[16px] text-black text-2xl mt-2 text-center'><b>{project.title}</b></div>
        <div className='text-[14px] text-black'><b>Team: {project.team}</b></div>
        <p className='text-white text-[14px] pt-4 line-clamp-4'>{project.text}</p>

        <div className='flex gap-3 items-center mt-2'>
            <button className='flex items-center justify-center gap-2 text-xs text-white'>
                <AiFillEye /> <span>{project.views}</span>
            </button>
            <button className='flex items-center justify-center gap-2 text-xs text-white'>
                <AiOutlineMessage /> <span>{project.comments?.length || 0}</span>
            </button>
        </div>
     </div>
     <hr className='mt-2 border-gray-400' />
    </Link>
  )
}
