import express from 'express';
import { addPackage } from '../controllers/packageController';
//import { getAllBooking } from '../controllers/booking';
import { updatePackage } from '../controllers/packageController';
import { upload } from '../middlewares/multer.middleware';
//import { authMiddleware } from '../middlewares/authMiddleware';
const adminRoute = express.Router();
//adminRoute.use(authMiddleware);
adminRoute.post('/package', upload.single('image'), addPackage)
adminRoute.put('/package/:id', updatePackage)
//adminRoute.delete('/package/:id', deletePackage)
//adminRoute.get('/bookings', getAllBooking)
export default adminRoute;
