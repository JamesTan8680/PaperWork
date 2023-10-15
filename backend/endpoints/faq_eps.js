import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";

const faq_ep_router = express.Router();
faq_ep_router.use(cors());
faq_ep_router.use(express.json());
const macros = new ep_macros();

faq_ep_router.get("/:id", (req, res) =>{
    macros.query("SELECT * FROM faq WHERE faq_id = ?",[req.params.id],res)
})


faq_ep_router.get("/", (req, res) =>{
    macros.query("SELECT * FROM faq",res)
})


export default faq_ep_router
