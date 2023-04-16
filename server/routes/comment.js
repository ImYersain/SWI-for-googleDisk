import {Router} from 'express';
import { createComment } from '../controllers/comment.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router()

//Create project (http://localhost:3007/api/comments/:id)
router.post('/:id', checkAuth, createComment);
    
export default router;
