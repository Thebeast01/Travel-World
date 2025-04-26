import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../db/db";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, location } = req.body
    if (!email || !password || !name || !location) {
      res.status(400).json({ message: "All fields are required" })
      return
    }
    // Check if user with same email already exist in database
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (user) {
      res.status(400).json({ message: "User with same email already exist" })
      return
    }
    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        location
      }
    })
    res.status(201).json({ message: "User Created Successfully", data: newUser })
    return
  }
  catch (e) {
    res.status(500).json({ message: e })
    return

  }

}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({
        message: "All Fields are required"
      })
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (!user) {
      res.status(400).json({
        message: "User not found , Please register first"
      })
      return
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(400).json({
        message: "Invalid Password"
      })
      return
    }
    console.log("Is Password Valid", isPasswordValid)

    const jwtToken = jwt.sign({
      id: user.id,
    }, process.env.JWT_SECRET as string, { expiresIn: "10d" })
    console.log("Token", jwtToken)
    res.cookie("token", jwtToken)
    res.status(200).json({ message: "Login Successfull" })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e })
    return
  }

} 
