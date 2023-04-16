import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProject } from '../redux/features/project/projectSlice';
import { AppDispatch } from '../redux/store';

export const AddProjectPage = () => {
  const [image, setImage] = useState<any>('');
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  

  const submitHandler = async () => {
    try {
      const data = new FormData();
      if(!title || !team || !text){
        toast('Project was not created, enter all inputs');
        return;
      }
      data.append('image', image);
      data.append('title', title);
      data.append('text', text);
      data.append('team', team);
      data.append('downdloadLink', link);
  
      await dispatch(createProject(data));
      navigate('/');
      toast('Project was created')
    } catch (error) {
      console.log(error);
    }
  }

  const clearFormHandler = () => {
    if(window.confirm('Are you sure want to reset from?')){
      setImage('');
      setTitle('');
      setText('');
      setTeam('');
      setLink('');
    }
  }

  return (
    <form className='w-1/3 mx-auto p-10 m-10 bg-gray-200 rounded-xl' onSubmit={(e) => e.preventDefault()}>
      <label className='text-white py-2 bg-[#757474] text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Pin a picture with team's logo:
          <input type="file" className='hidden' onChange={(e:any) => setImage(e.target.files[0])}/>
      </label>
      <div className='flex object-cover py-2'>
        {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
      </div>
      
      <label className='text-xs text-black mt-2'>
        Project title:
          <input type='text'
           placeholder='Title'
           value={title}
           required
           onChange={(e) => setTitle(e.target.value)}
           className='mt-1 text-white w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </label>

      <div className='text-xs text-black mt-4'>
        Team (student's school emails):
          <input type='text'
           placeholder='Team'
           value={team}
           required
           onChange={(e) => setTeam(e.target.value)}
           className='mt-1 text-white w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </div>

      <div className='text-xs text-black mt-4'>
        Project description:
          <textarea 
           placeholder='Description'
           value={text}
           required
           onChange={(e) => setText(e.target.value)}
           className='mt-1 text-white w-full rounded-lg resize-none h-40 bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </div>

      <div className='mt-5'>
        <label className='text-xs text-black'>
          Link on project:
            <input type='text'
            placeholder='Link on github'
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className='mt-1 text-white w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
        </label>
      </div>

      <div className='flex gap-8 items-center justify-center mt-6'>
        <button
          onClick={submitHandler}
          className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
        Create project
        </button>
        <button 
          onClick={clearFormHandler} 
          className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'>
          Clear form
        </button>
      </div>
    </form>
  )
}
