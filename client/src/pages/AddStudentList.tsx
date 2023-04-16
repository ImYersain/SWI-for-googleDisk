import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addStudents } from '../redux/features/students/studentsSlice';
import { RootState } from '../redux/store';

export const AddStudentList = () => {
    const [fileContent, setFileContent] = useState<any>("");
    //const dispatch = useDispatch();
    //const students = useSelector((state : RootState) => state.students.students);
    
    const handleFileUpload = (event:any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
        const content = event?.target?.result;
        setFileContent(content);
        };
        reader.readAsText(file);
    };

    useEffect(() => {
        //dispatch(addStudents(fileContent.split(', ')));
        localStorage.setItem("students", fileContent.split(', '));
    }, [fileContent])
    

    return (
        <div className='mt-5 text-center'>
        <div className="text-xl text-center mb-5"><b>Import students list</b></div>
        <input type="file" onChange={handleFileUpload} />
        <p className='mt-5 text-green-500'>{fileContent}</p>
        </div>
    );
}
