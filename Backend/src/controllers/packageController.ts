import { Request, Response } from 'express'
import { uploadImageOnCloudinary } from '../utils/cloudinary'
import { prisma } from '../db/db'
import fs from 'fs'
export const addPackage = async (req: Request, res: Response) => {
  const {
    title, description, price, availableDates
  } = req.body

  const localImagePath = req.file?.path
  if (!localImagePath) {
    res.json({
      error: "Please upload an image"
    })
    return
  }
  console.log("This is localImagePath", localImagePath)

  try {
    const imageUrl = await uploadImageOnCloudinary(localImagePath)
    console.log("This is imageUrl", imageUrl)
    if (!imageUrl) {
      res.json({
        error: "Error uploading image"
      })
      return
    }

    const parsedDates = typeof availableDates === 'string' ? JSON.parse(availableDates) : availableDates;
    const newPackage = await prisma.package.create({
      data: {
        title: title,
        description: description,
        price: price,
        availableDates: parsedDates,
        image: imageUrl
      }
    })
    res.json({ success: true, newPackage })
  } catch (err) {
    console.log("Error", err)
    res.json({
      error: err
    })
  }
}
//Get all packages
export const getPackages = async (req: Request, res: Response) => {
  try {
    const allPackage = await prisma.package.findMany()
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
  console.log("This is id ", id)
  try {
    const onePackage = await prisma.package.findUnique({
      where: {
        id: id
      }
    })
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
//// Update package
export const updatePackage = async (req: Request, res: Response) => {
  const id = req.params.id
  const { title, description, price, availableDates } = req.body
  try {
    //const findPackage = await prisma.package.findUnique({
    //  where: {
    //    id: id
    //  }
    //})
    //if (!findPackage) {
    //  res.json({
    //    message: "Package Not Found",
    //    success: false
    //  })
    //  return
    //}
    const updatePackage = await prisma.package.update({
      where: {
        id: id
      },
      data: {
        title: title,
        description: description,
        price: price,
        availableDates: availableDates
      }
    })

    res.json({
      message: "Package Updated",
      success: true,
      data: updatePackage
    })
  } catch (error) {
    alert("This is catch Block")
    res.json({
      message: "Package Not Found",
      success: false,
      error
    })
  }
}
//
//
//export const deletePackage = async (req: Request, res: Response) => {
//  const id = req.params.id
//  try {
//    const deletePackage = await TravelPackage.findByIdAndDelete(id)
//
//    res.json({
//      message: "Package Deleted",
//      success: true,
//      deletedPackage: deletePackage
//    })
//  } catch (error) {
//    res.json({
//      message: "Package Not Found",
//      success: false,
//      error
//    })
//  }
//}
