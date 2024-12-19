import express from 'express';
import { addPackage, deletePackage, updatePackage } from '../controllers/packageController';
import { getAllBooking } from '../controllers/booking';
const adminRoute = express.Router();
adminRoute.post('/package', addPackage)
adminRoute.put('/package/:id', updatePackage)
adminRoute.delete('/package/:id', deletePackage)
adminRoute.get('/bookings', getAllBooking)
export default adminRoute;
