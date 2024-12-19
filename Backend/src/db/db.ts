import mongoose from "mongoose";

mongoose.connect('mongodb+srv://mohammadsaif0847:9seamzIshoryU4yg@travel.8uxqd.mongodb.net/?retryWrites=true&w=majority&appName=Travel')

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
