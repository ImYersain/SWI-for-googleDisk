import React, { useCallback, useEffect, useState } from 'react';
import axios from '../utils/axios';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import Moment from 'react-moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IProject } from '../types/project';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { removeProject } from '../redux/features/project/projectSlice';
import { toast } from 'react-toastify';
import { createComment, getProjectComments } from '../redux/features/comments/commentSlice';
import { CommentItem } from '../components/CommentItem';
import ReactMarkdown from 'react-markdown';

export const ProjectPage = () => {
  const params = useParams();
  const [project, setProject] = useState<IProject | null>(null);
  const [comment, setComment] = useState<string>('');
  const user = useSelector((state: RootState) => state.auth.user);
  const { comments } = useSelector((state: RootState) => state.comment);
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const fetchProject = useCallback(async () => {
    const { data } = await axios.get(`/projects/${params.id}`);
    setProject(data);
  }, [params.id]);

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getProjectComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const onRemoveButton = () => {
    try {
      if (window.confirm('Are you sure want to delete this project?')) {
        dispatch(removeProject(params.id));
        toast('Project was deleted');
        navigate('/projects');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      const projectId = params.id;
      const author = user?.username;
      dispatch(createComment({ projectId, comment, author }));
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  if (!project) {
    return <div className="text-xl text-center text-white py-10">Loading...</div>;
  }
  
  const sumEvaluation = Number(project.phase1) + Number(project.phase2) + Number(project.phase3);
  let fullEvaluation = 'N/A';

  switch(sumEvaluation){
    case 30:
      fullEvaluation = 'A';
      break;
    case 25:
      fullEvaluation = 'B';
      break;
    case 20:
      fullEvaluation = 'C';
      break;
    case 15:
      fullEvaluation = 'D';
      break;
    case 10:
      fullEvaluation = 'E';
      break;
    case 5:
      fullEvaluation = 'F';
      break;
    default:
      fullEvaluation = 'N/A'
  }

   return (
    <div>
      <button className="flex justify-center items-center bg-[#8f0e07] text-xs text-white rounded-sm py-2 px-4 mt-4 hover:text-black">
        <Link className="flex" to={'/'}>
          Back
        </Link>
      </button>
      
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className={'flex rounded-sm h-80'}>
              {project?.imgUrl ? (
                <img src={`http://localhost:3007/${project.imgUrl}`} alt="img" className="object-cover w-full" />
              ) : (
                <img
                  src={'https://lms.pb.edu.bn/vle/sict/pluginfile.php/16462/course/overviewfiles/project.png'}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className=" text-black">Created: <a className='hover:text-green-500 ' href={`mailto: ${project.username}`}>{project?.username}</a></div>
            <div className=" text-black">
              <Moment date={project?.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <hr className='border-gray-400' />
          <br />

          <div className="text-black text-xl mt-2 text-center">{project.title}</div>
          <div className="text-[14px] text-black">Team: <span className='text-green-500 font-bold'>{project.team}</span></div>
          <p className="text-white pt-4">
            <ReactMarkdown children={project.text} />
          </p>
          <br />
          <br />
          <hr className='border-gray-400' />
          <div className="text-black pt-4">{'Downdload project (github link):  '}   
            <a className='hover:text-green-500' href={project.downdloadLink}>
              {project.downdloadLink === ''? '   .....' : project.downdloadLink}
            </a>
          </div>
          
          <div className='text-green-500 mt-2 mb-2'>
          <div>
            Hodnoceni prvni faze: {project?.phase1 == 'undefined'? 'N/A': project.phase1}
          </div>
          <div>
            Hodnoceni druha faze: {project?.phase2 == 'undefined'? 'N/A': project.phase2}
          </div>
          <div>
            Hodnoceni treti faze: {project?.phase3 == 'undefined'? 'N/A': project.phase3}
          </div>

          </div>


          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-white hover:opacity-50">
                <AiFillEye /> <span>{project?.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-white hover:opacity-50">
                <AiOutlineMessage /> <span>{project?.comments?.length || 0}</span>
              </button>
              
            </div>
            <div className="flex gap-3 mt-4">
                <div className="flex items-center justify-center gap-2 text-white hover:opacity-50 cursor-pointer">
                {/* Hodnoceni celeho projektu: {project?.evaluation === 'undefined' ? 'N/A': project.evaluation} */}
                Hodnoceni celeho projektu: {fullEvaluation}
              </div>
            </div>

            {user?._id === project.author || user?.username === 'ucitel' ? (
              <div className="flex gap-3 mt-4">
                <div className="flex gap-3 mt-4">
                  <button className="flex items-center justify-center gap-2 text-white hover:opacity-50">
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button
                    onClick={onRemoveButton}
                    className="flex items-center justify-center gap-2 text-white hover:opacity-50"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ): null}
          </div>
        </div>
        <div className="w-1/3 flex gap-2 p-8 bg-gray-200 flex-col rounded-xl">
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">

            {user &&
              <><input
                 type="text"
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
                 placeholder="Comment"
                 className="text-white w-full rounded-sm bg-[#757474] border border-black p-2 text-xs outline-none placeholder:text-gray-700" /><button
                   onClick={handleSubmit}
                   type="submit"
                   className="flex text-xs justify-center items-center bg-[#757474] rounded-sm py-2 px-4 text-white hover:text-black"
                 >
                   Send
                 </button></>
            }

          </form>
            {comments?.map((cmt) => (
              <CommentItem key={cmt._id} cmt={cmt} />
            ))}
        </div>
      </div>
    </div>
  );
};
