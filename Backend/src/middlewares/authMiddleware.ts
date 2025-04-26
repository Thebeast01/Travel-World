import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['token']
    console.log(token)
    if (!token) {
      res.status(401).json({ msg: "Access Denied" })
      return
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET as string)
    req.body.user = verified
    next()
  } catch (error) {
    res.status(400).json({ msg: "Invalid Token", error: error })
  }

}
