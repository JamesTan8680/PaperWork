import express from "express";
import cors from "cors";
import mysql from "mysql";
import homepage_ep_router from "./endpoints/homepage_eps.js";
import view_document_ep_router from "./endpoints/view_document_eps.js";
import create_document_ep_router from "./endpoints/create_document_eps.js";
import db from "./endpoints/db.js";
import misc_router from "./endpoints/misc_eps.js";
import customise_document_ep_router from "./endpoints/customise_document_eps.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use('/',misc_router);
app.use('/view-document',view_document_ep_router);
app.use('/create-document',create_document_ep_router);
app.use('/customise-document',customise_document_ep_router);

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
