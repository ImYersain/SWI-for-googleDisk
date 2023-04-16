import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { updateProject } from '../redux/features/project/projectSlice';
import { IProject } from '../types/project';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

export const EditProjectPage = () => {
  const [oldImage, setOldImage] = useState<any>('');
  const [newImage, setNewImage] = useState<any>('');
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [team, setTeam] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [phase1, setPhase1] = useState<string>('');
  const [phase2, setPhase2] = useState<string>('');
  const [phase3, setPhase3] = useState<string>('');
  const { loading } = useSelector((state: RootState) => state.project);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const params = useParams();
  const id:any = params.id;
  const user = useSelector((state: RootState) => state.auth.user);

  const fetchProject = useCallback( async () => {
    const { data } = await axios.get<IProject>(`/projects/${id}`);

    setOldImage(data.imgUrl);
    setTitle(data.title);
    setText(data.text);
    setTeam(data.team);
    setLink(data.downdloadLink);
    setPhase1(data.phase1);
    setPhase2(data.phase2);
    setPhase3(data.phase3);
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject])

  const submitHandler = async () => {
    try {
      const newProject = new FormData();
      if(!title || !team || !text){
        toast('Project was not created, enter all inputs');
        return;
      }
      newProject.append('id', id);
      newProject.append('image', newImage);
      newProject.append('title', title);
      newProject.append('text', text);
      newProject.append('team', team);
      newProject.append('downdloadLink', link);
      newProject.append('phase1', phase1);
      newProject.append('phase2', phase2);
      newProject.append('phase3', phase3);

      await dispatch(updateProject(newProject));
      toast('Changes was saved');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const clearFormHandler = () => {
    if(window.confirm('Are you sure want to reset from?')){
      setTitle('');
      setText('');
      setTeam('');
      setLink('');
      setPhase1('');
      setPhase2('');
      setPhase3('');
    }
  } 

  const selectCreator = (value:string, changeValue:any) => {
    return (
      <select className='px-4 ml-2 text-black rounded-sm' name="evaluation" value={value} onChange={(e) => changeValue(e.target.value)}>
        <option value='N/A'>N/A</option>
        <option value="0">0 bodu</option>
        <option value="5">5 bodu</option>
        <option value="10">10 bodu</option>
      </select>
    )
  }

  if (loading) {
    return <div className="text-xl text-center text-white py-10">Loading...</div>;
    }

  return (
    <form className='w-1/3 mx-auto p-10 m-10 bg-gray-200 rounded-xl' onSubmit={(e) => e.preventDefault()}>
      <label className='text-white py-2 bg-[#757474] text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Pin a picture with team's logo:
          <input type="file" className='hidden' onChange={(e:any) => {
            setNewImage(e.target.files[0]);
            setOldImage('');
            }}/>
      </label>
      <div className='flex object-cover py-2'>
        {oldImage && <img src={`http://localhost:3007/${oldImage}`} alt={oldImage.name} />}
        {newImage && <img src={URL.createObjectURL(newImage)} alt={newImage.name} />}
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
        Team (users lastname's):
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
        <label className='text-xs text-black mt-4'>
          Link on project:
            <input type='text'
            placeholder='Link'
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className='mt-1 text-white w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
        </label>
      </div>
      
      {user?.username === 'ucitel' && (
        <div className='mt-5'>
          <div className='text-xs text-black mt-4'>
          <div className='mt-2'>
            Hodnoceni prvni faze: 
              {selectCreator(phase1,setPhase1)}
          </div>
          <div className='mt-2'>
            Hodnoceni druha faze: 
            {selectCreator(phase2,setPhase2)}
          </div>
          <div className='mt-2'>
            Hodnoceni treti faze:
            {selectCreator(phase3,setPhase3)}
          </div>
          </div>
          <div className='text-xs text-black mt-4'>
          {/* Evaluation of teacher:
          <select className='px-4 ml-2 text-black rounded-sm' name="evaluation" value={evaluation} onChange={(e) => setEvaluation(e.target.value)}>
            <option value='N/A'>N/A</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select> */}
          </div>
        </div>
      )}

      <div className='flex gap-8 items-center justify-center mt-6'>
        <button
         onClick={submitHandler}
          className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
          Save changes
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
