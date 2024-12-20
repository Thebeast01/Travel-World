import express from 'express'
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv'
import cors from 'cors'
import adminRoute from './routes/adminRoutes'
import { getOnePackage, getPackages } from './controllers/packageController'
import { addBooking, getSingleBooking } from './controllers/booking'
dotenv.config()
const app = express()
app.use(cors({
  origin: "https://travel-world-frontend.vercel.app/",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']

}))
app.use(express.json(
  {
    limit: '50mb'
  }
))

// Route for login and registero


app.use('/api/v1/auth', authRoutes)
// Route only for admin
app.use('/api/v1/admin', adminRoute)
// Route to get all packages
app.get('/api/v1/packages', getPackages)
app.get('/api/v1/package/:id', getOnePackage)
// Booking Route
app.post('/api/v1/booking', addBooking)
app.get('/api/v1/bookings/:id', getSingleBooking)
app.get("/", (req, res) => {
  res.send("Server is running")
})
app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
