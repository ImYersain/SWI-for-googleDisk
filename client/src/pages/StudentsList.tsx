import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

export interface IUser {
    username: string;
    studentname: string;
    studentlastname: string;
    _id: string
}

export default function StudentsList() {
    const [allUsers, setAllUsers] = useState<IUser[]>();

    useEffect(() => {
        const getAllUsers = async () => {
            const {data} = await axios.get('auth/all')
            setAllUsers(data.users);
        }

        getAllUsers();
    }, []);

    const students = allUsers?.filter(item => item.username !== 'ucitel')

  return (
    <div className='mt-5 text-center'>
    <div className="text-xl text-center mb-5"><b>Registration students</b></div>
     <ul>
        {students?.map(({studentname, studentlastname, username, _id}) => <li key={_id}>{studentname} {studentlastname} - <a className='hover:text-green-500'  href={`mailto: ${username}`}>{username}</a></li>)}
     </ul>
    </ div>
  )
}
