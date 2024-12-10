import { Request, Express } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { join } from 'path'
import { UPLOAD_PATH_TEMP } from '../config'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: DestinationCallback
    ) => {
        cb(
            null,
            join(
                __dirname,
                `../public/${UPLOAD_PATH_TEMP}`
            )
        )
    },
    filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ) => {
        cb(null, file.originalname)
    },
})

const types = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
]

const minSize = 1024 * 2;// 2Kb
const maxSize = 1024 * 1024 * 5; // 5Mb

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (!types.includes(file.mimetype)) {
        return cb(null, false)
    }

    if (file.size < minSize) {
        return cb(null, false)
    }
    if (file.size > maxSize) {
        return cb(null, false)
    }

    return cb(null, true)
}

export default multer({
    storage, fileFilter
})
