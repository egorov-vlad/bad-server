import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import { UPLOAD_PATH } from '../config';
import BadRequestError from '../errors/bad-request-error'

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }
    try {
        const fileName = `/${UPLOAD_PATH}/${crypto.randomUUID().slice(0, 8)}. ${req.file.mimetype.split('/')[1]}`;
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        return next(error)
    }
}

export default {}
