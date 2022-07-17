const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const Vehicle = require("../models/vehicle");
const Workshop = require("../models/workshop");
const auth = require("../middlewares/auth");

userRouter.post("/user/vehicles", auth, async (req, res) => {
  try {
    const { model, vehicleNumber } = req.body;
    const existingVehicle = await Vehicle.findOne({
      model: { $regex: model, $options: "i" },
    });
    await User.updateOne(
      { _id: req.user },
      {
        $set: {
          vehicleId: existingVehicle._id,
          vehicleNumber,
        },
      }
    );
    res.status(200).json({ msg: "Vehicle Updated" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.get("/user/workshops/:category", auth, async (req, res) => {
  try {
    const { category } = req.params;
    const existingWorkshop = await Workshop.find({
      servicetype: { $regex: category, $options: "i" },
    }).sort({ rating: -1 });

    res.status(200).json(existingWorkshop);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = userRouter;
