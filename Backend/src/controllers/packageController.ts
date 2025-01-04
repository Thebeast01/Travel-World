import { Request, Response } from 'express'
import fs from 'fs'
import { TravelPackage } from '../db/db'
import { uploadImageOnCloudinary } from '../utils/cloudinary'
export const addPackage = async (req: Request, res: Response) => {
  const {
    title, description, price, availableDates
  } = req.body

  const localImagePath = req.file?.path
  console.log("This is localImagePath", localImagePath)
  try {
    const imageUrl = await uploadImageOnCloudinary(localImagePath)
    const newPackage = new TravelPackage({
      title, description, price, availableDates, image: imageUrl
    })
    const savePackage = await newPackage.save()
    res.json({ success: true, savePackage })
  } catch (err) {
    res.json({
      error: err
    })
  }
}
//Get all packages
export const getPackages = async (req: Request, res: Response) => {
  try {
    const allPackage = await TravelPackage.find()
    res.json(allPackage)
  }
  catch (error) {
    res.json({
      error
    })
  }
}
//Get a specific Package
export const getOnePackage = async (req: Request, res: Response) => {

  const id = req.params.id
  console.log(id)
  try {
    const onePackage = await TravelPackage.findById(id)
    res.json({
      msg: "Package Found",
      success: true,
      onePackage
    })
  } catch (error) {
    res.json({
      "msg": "Package Not Found",
      success: false,
      Error: error
    })
  }
}
// UPdate package
export const updatePackage = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const findPackage = await TravelPackage.findById(id)
    if (!findPackage) {
      res.json({
        message: "Package Not Found",
        success: false
      })
      return
    }
    const updatePackage = await TravelPackage.findByIdAndUpdate(id, req.body, { new: true })

    res.json({
      message: "Package Updated",
      success: true,
      data: updatePackage
    })
  } catch (error) {
    res.json({
      message: "Package Not Found",
      success: false,
      error
    })
  }
}


export const deletePackage = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const deletePackage = await TravelPackage.findByIdAndDelete(id)

    res.json({
      message: "Package Deleted",
      success: true,
      deletedPackage: deletePackage
    })
  } catch (error) {
    res.json({
      message: "Package Not Found",
      success: false,
      error
    })
  }
}
