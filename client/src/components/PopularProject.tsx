import React from 'react'
import { Link } from 'react-router-dom'
import { IProject } from '../types/project'


interface IPopularProjectProps {
  project: IProject
}

export const PopularProject = ({project}:IPopularProjectProps) => {
  return (
    <div className='bg-[#8f0e07] my-1'>
      <Link to={`/${project._id}`}>
      <div className='flex p-2 text-xs text-white hover:bg-gray-400'>
            {project.title}
        </div>
      </Link>
    </div>
  )
}
