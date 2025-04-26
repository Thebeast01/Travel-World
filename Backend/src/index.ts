import express from 'express'
import CookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv'
import cors from 'cors'
import adminRoute from './routes/adminRoutes'
import { getPackages, getOnePackage } from './controllers/packageController'
dotenv.config()
const app = express()
app.use(CookieParser())
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true

}))
app.use(express.json(
  {
    limit: '50mb'
  }
))
app.get("/", (req, res) => {
  res.json("Server is running")
})
app.use('/api/v1/auth', authRoutes)
// Route only for admin
app.use('/api/v1/admin', adminRoute)
// Route to get all packages
app.get('/api/v1/packages', getPackages)
app.get('/api/v1/package/:id', getOnePackage)
// Booking Route
//app.post('/api/v1/booking', addBooking)
//app.get('/api/v1/bookings/:id', getSingleBooking)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
