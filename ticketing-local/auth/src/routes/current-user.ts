import express, { Response, Request, Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { currentUser }  from '@vmmtickets/common';
import { requireAuth } from '@vmmtickets/common';

 
const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null});
    return;
})

export {router as currentUserRouter}