import express from "express";
import "./db";
import { noteRoute } from "./route";
import cors from "cors";

// create server
const app = express();

app.use(cors());

// this will parse post request coming from fetch.post() method
app.use(express.json());

// this will parse post request coming from html form
app.use(express.urlencoded({ extended: false }));

app.use("/note", noteRoute);

//listen on port

app.listen(3000, () => {
  console.log("listening on port");
});
