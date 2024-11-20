import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError } from '@vmmtickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', requireAuth, async (req: Request, res: Response) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            throw new NotFoundError();
        }

        res.status(200).send(ticket);
    } catch (error) {
        console.log('error in /api/tickets/id', error)
    }



});

export { router as showTicketRouter };