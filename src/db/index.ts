import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/glorify")
  .then(() => {
    console.log("DB connection established!");
  })
  .catch((error) => {
    console.log("DB connection failed! : ", error);
  });
