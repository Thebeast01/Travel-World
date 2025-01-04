import express from 'express';
import { addPackage, deletePackage, updatePackage } from '../controllers/packageController';
import { getAllBooking } from '../controllers/booking';
import { upload } from '../middlewares/multer.middleware';
const adminRoute = express.Router();
adminRoute.post('/package', upload.single('image'), addPackage)
adminRoute.put('/package/:id', updatePackage)
adminRoute.delete('/package/:id', deletePackage)
adminRoute.get('/bookings', getAllBooking)
export default adminRoute;
