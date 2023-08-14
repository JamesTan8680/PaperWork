import express from "express";
import cors from "cors";
import mysql from "mysql";
import homepage_ep_router from "./endpoints/homepage_eps.js";
import viewdocument_ep_router from "./endpoints/viewdocument_eps.js";
import db from "./endpoints/db.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use('/view-document',viewdocument_ep_router);

//This line separate Jordan code and Simon code --------------------------------------------------------------------------------------------
//Simon`s code

app.use('/homepage',homepage_ep_router);

//check if the database is existed or not
db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

//listen to the backend
app.listen(8800, () => {
  console.log("backend connected");
});
