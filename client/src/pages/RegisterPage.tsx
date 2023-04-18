import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice';
import { AppDispatch, RootState } from '../redux/store';

export const RegisterPage = () => {
  const [username, setUsername] = useState<string>('');
  const [studentname, setStudentname] = useState<string>('');
  const [studentlastname, setStudentlastname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const status = useSelector((state : RootState) => state.auth.status);
  //const students = useSelector((state : RootState) => state.students.students);
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  const students = localStorage.getItem('students');
console.log(students);
const whoCanStudents = students?.includes(username)? true: false;

  useEffect(() => {
    if(status) toast(status);
    if(isAuth) navigate('/');
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      if(username.match(validEmail)){
        dispatch(registerUser({username, studentname, studentlastname, password}));
      } else {
        toast('Email incorrect!');
        return;
      }
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
      <h1 className='text-lg text-white text-center'>Registration</h1>
      <label className='text-xs text-white'>
        Email: 
        <input className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'  
        type='email' placeholder='Enter your email' value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      {whoCanStudents && username ? <div className='text-green-500'>you can</div>: <div className='text-red-500'>you can not!</div>}
      <label className='text-xs text-white'>
        Name: 
        <input className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'  
        type='email' placeholder='Enter your name' value={studentname} onChange={(e) => setStudentname(e.target.value)} />
      </label>
      <label className='text-xs text-white'>
        Last name: 
        <input className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'  
        type='email' placeholder='Enter your last name' value={studentlastname} onChange={(e) => setStudentlastname(e.target.value)} />
      </label>
      
      <label className='text-xs text-white'>
        Password: 
        <input className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'  
        type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div className="flex gap-8 justify-center mt-4">
       {whoCanStudents &&
        <button type='submit' className='flex justify-center items-center text-xs bg-gray-400 text-black hover:text-white rounded-sm py-2 px-4'
        onClick={handleSubmit}>
          Register
        </button>}
        {/* {students === null && <button type='submit' className='flex justify-center items-center text-xs bg-gray-400 text-black hover:text-white rounded-sm py-2 px-4'
        onClick={handleSubmit}>
          Register
        </button>
        } */}
        <Link to='/login' className='flex justify-center items-center text-xs text-white hover:text-black'>
          I always have account.
        </Link>
      </div>
    </form>
  )
}
