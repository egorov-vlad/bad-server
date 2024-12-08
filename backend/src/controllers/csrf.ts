import { Request, Response } from 'express';
import { generateToken } from '../middlewares/csrf-handler';

export const generateCSRFToken = (req: Request, res: Response) => {
    console.log('generateCSRFToken');
    const token = generateToken(req, res, false);
    // res.cookie('csrftoken', token, { httpOnly: true });
    res.send({ token });
}
