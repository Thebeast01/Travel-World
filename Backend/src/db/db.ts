import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectToDatabase = async () => {
  try {
    console.log(process.env.DB_URI)
    await mongoose.connect(process.env.DB_URI as string)
  } catch (error) {
    throw new Error("Error Occuer")
  }
}
connectToDatabase()

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
})
const travelPackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: { type: [String], required: true },
  image: { type: String, required: true }
})
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  numberOfTravelers: {
    type: Number,
    required: true
  },
  specialRequest: {
    type: String,
    required: false
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TravelPackage",
  },
  TotalPrice: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }

})
const User = mongoose.model("User", UserSchema);

const TravelPackage = mongoose.model("TravelPackage", travelPackageSchema)
const Booking = mongoose.model("Booking", bookingSchema)
export { User, TravelPackage, Booking }
