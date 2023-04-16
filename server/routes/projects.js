import {Router} from 'express';
import { createProject, getAll, getById, getMyProjects, removeProject, updateProject, getProjectComments } from '../controllers/projects.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router()

//Create project (http://localhost:3007/api/projects)
router.post('/', checkAuth, createProject);

//Get all projects (http://localhost:3007/api/projects)
router.get('/', getAll);

//Get project by id (http://localhost:3007/api/projects/:id)
router.get('/:id', getById);

//Get my projects (http://localhost:3007/api/projects/user/me)
router.get('/user/me', checkAuth, getMyProjects);

//Remove project (http://localhost:3007/api/projects/:id)
router.delete('/:id', checkAuth, removeProject);

//Update project (http://localhost:3007/api/projects/:id)
router.put('/:id', checkAuth, updateProject);

//Get project comments (http://localhost:3007/api/projects/comments/:id)
router.get('/comments/:id', getProjectComments);
    
export default router;
