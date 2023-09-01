import express from "express";
import cors from "cors";
import mysql from "mysql";
import homepage_ep_router from "./endpoints/homepage_eps.js";
import view_document_ep_router from "./endpoints/view_document_eps.js";
import create_document_ep_router from "./endpoints/create_document_eps.js";
import db from "./endpoints/db.js";
import misc_router from "./endpoints/misc_eps.js";
import customise_document_ep_router from "./endpoints/customise_document_eps.js";
import send_document_ep_router from "./endpoints/send_document_eps.js";
import ep_macros from "./endpoints/macro.js";

const app = express();
const macros = new ep_macros();
app.use(cors());
app.use(express.json());

app.use('/view-document',view_document_ep_router);
app.use('/create-document',create_document_ep_router);
app.use('/customise-document',customise_document_ep_router);
app.use('/send-document', send_document_ep_router);
app.use('/',misc_router);
app.use('/homepage',homepage_ep_router);


//DEBUG GET METHOD, USE TO GET ALL DATA ON SAME BROWSER TAB
//
//TODO: DELETE ME ON PRODUCTION !!!!!!!!!!!!!!!!
//
app.get('/--test--/:id',(req,res)=>{
  macros.select(req.params.id,{},res);
});

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
