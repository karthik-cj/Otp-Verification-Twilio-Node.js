const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const PORT = process.env.PORT || 8080;
const app = express();
const DB = "Enter Your DataBase URL Here!!!";

app.use(express.json());
app.use(authRouter);

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
