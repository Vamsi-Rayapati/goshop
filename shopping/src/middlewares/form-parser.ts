import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
export default function formParser(req:Request, res: Response, next:NextFunction): void {
  if (req.headers['content-type'].includes('multipart/form-data')) {
    upload.single('file')(req, res, next);
  } else {
    next();
  }
}
