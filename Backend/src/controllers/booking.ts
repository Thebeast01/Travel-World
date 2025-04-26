//import { Booking } from "../db/db";
//import { Request, Response } from 'express'
//export const addBooking = async (req: Request, res: Response) => {
//  const data = req.body;
//  try {
//    const newBooking = new Booking({
//      name: data.name,
//      email: data.email,
//      phone: data.phone,
//      numberOfTravelers: data.numberOfTravelers,
//      specialRequest: data.specialRequest,
//      packageId: data.packageId,
//      TotalPrice: data.TotalPrice
//    })
//    const saveBooking = await newBooking.save()
//    res.json({
//      message: "Booking Successfull",
//      success: true,
//      id: saveBooking._id
//    })
//  } catch (err) {
//    res.json({
//      error: err
//    })
//  }
//}
//export const getSingleBooking = async (req: Request, res: Response) => {
//  const { id } = req.params;
//  try {
//    const booking = await Booking.findById(id)
//    res.json(booking)
//  } catch (err) {
//    res.json({
//      error: err
//    })
//  }
//}
//export const getAllBooking = async (req: Request, res: Response) => {
//  try {
//    const booking = await Booking.find()
//    res.json(booking);
//  }
//  catch (error) {
//    res.json(
//      error
//    )
//  }
//
//}
