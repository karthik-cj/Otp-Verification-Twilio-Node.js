const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const PORT = process.env.PORT || 8080;
const app = express();
const DB =
  "mongodb+srv://amal:amal123@cluster0.vie2q.mongodb.net/VEcare?retryWrites=true&w=majority";

app.use(express.json());
app.use(authRouter);
app.use(userRouter);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
