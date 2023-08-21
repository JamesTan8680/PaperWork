import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";

const misc_router = express.Router();
misc_router.use(cors());
misc_router .use(express.json());
const macros = new ep_macros();

misc_router.get("/parties", (req, res) => {
    macros.select("parties", {}, res);
  })

export default misc_router;
