import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {body} from 'express-validator';
import { User, UserAttr } from '../models/user';
import { BadRequestError } from '@vmmtickets/common';
import { validateRequest } from '@vmmtickets/common';
import { publishUserCreatedEvent } from '../../kafka';
import {indexTicket} from '../../elasticsearch/index'
const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage('Password must be between 4 and 20 characters')
], 
validateRequest, 
async (req: Request, res: Response)  => {
    
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new BadRequestError('Email in use');
    
    }

    const user = User.build({email, password});
    await user.save();

    // generate JWT
    console.log('process.env.JWT_KEY', process.env.JWT_KEY)
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    //store it on session object
    req.session = {
        jwt: userJwt
    }
    await indexTicket(user);
     // Publish user created event to Kafka
    await publishUserCreatedEvent(user);
 
    res.status(201).send(user);
});

export {router as signupRouter}