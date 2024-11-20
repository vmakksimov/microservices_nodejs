
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@vmmtickets/common';
const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
    if (!req.session) {
        res.send({message: 'no current logged in user'});
        return;
    }

    req.session = null;
    res.send({message: 'logged out'});
 
})

export {router as signoutRouter}