import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/db";
export const register = async (req: Request, res: Response) => {

  const { name, email, password, location } = req.body
  const newUser = new User({
    name, email, password, location
  })
  const saveUser = await newUser.save();

  res.json(saveUser)
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body
    const user = await User.findOne({
      email: email
    })
    if (!user) {
      res.json("User Not Found")
      return
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)
    res.header('Authorization', token).json({
      message: "Login Successfull",
      success: true,
      token
    })

  } catch (error) {
    console.log(error)
    res.json({
      error
    })
  }

}
