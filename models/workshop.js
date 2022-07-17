const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://amal:amal123@cluster0.vie2q.mongodb.net/VEcare?retryWrites=true&w=majority"
// );
const workshopSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    location: String,
    rating: Number,
    image: String,
    phone: String,
    servicetype: String,
  },
  { versionKey: false }
);

const Workshop = mongoose.model("workshop", workshopSchema);
module.exports = Workshop;
// const course = new Workshop({
//   name: "Maruthi Suzuki Service",
//   description: "Car Service Station - 12th Mile - Ponkunnam",
//   location: "",
//   rating: 1,
//   image: "",
//   phone: "7896202482",
//   servicetype: "Bike",
// });

// course.save();
