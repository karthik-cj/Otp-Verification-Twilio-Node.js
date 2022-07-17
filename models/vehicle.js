const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://amal:amal123@cluster0.vie2q.mongodb.net/VEcare?retryWrites=true&w=majority"
// );
const vehicleSchema = new mongoose.Schema(
  {
    make: String,
    model: String,
    fuelType: String,
    category: String,
  },
  { versionKey: false }
);

const Vehicle = mongoose.model("vehicle", vehicleSchema);
module.exports = Vehicle;
// const course = new Vehicle({
//   make: "Honda",
//   model: "City",
//   fuelType: "Diesel",
//   category: "Car",
// });

// course.save();
