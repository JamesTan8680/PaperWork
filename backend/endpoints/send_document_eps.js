import express from "express";
import cors from "cors";
import db from "./db.js";
import ep_macros from "./macro.js";
import view_document_ep_router from "./view_document_eps.js";

const send_document_ep_router = express.Router();
send_document_ep_router.use(cors());
send_document_ep_router.use(express.json());

const macro = new ep_macros();
const generateSearchString = macro.generate_search_string;
const select = macro.select;
const fetch = macro.query;


//get the number and ratio of sign entries of a template
send_document_ep_router.get("/:id/progress", (req, res) => {
    //https://stackoverflow.com/questions/4666042/sql-query-to-get-total-rows-and-total-rows-matching-specific-condition
    //https://stackoverflow.com/questions/1271810/counting-null-and-non-null-values-in-a-single-query
    //https://stackoverflow.com/questions/14962970/sql-query-if-value-is-null-then-return-1
    //select
    //  results:  the total number of the non-null signatures
    //  ratio:    number of approvals divided by the total matches in group (throw 0 if then dividing by zero)
    //from template parties BUT righted-join to AND grouped by ALL templates
    macro.query("SELECT COUNT(CASE WHEN document_parties.document_template_id IS NOT NULL THEN 1 END) as results, CASE WHEN document_parties.document_template_id IS NULL THEN 0 ELSE COUNT(CASE WHEN parties_approval=1 THEN 1 END)/COUNT(*) END AS ratio FROM paperwork_project.document_parties RIGHT JOIN paperwork_project.document_template ON document_parties.document_template_id = document_template.document_template_id WHERE document_template.document_template_id='" + req.params.id + "' GROUP BY document_template.document_template_id", res)
})

//get all sign entries of a template
send_document_ep_router.get("/:id/signature", (req, res) => {
    macro.select("document_parties",{where:"document_template_id='"+req.params.id+"'"},res)
})

//get all parties
send_document_ep_router.get("/parties", (req, res) => {
    macro.select("parties",{},res)
})

//get a party
send_document_ep_router.get("/parties/:id", (req, res) => {
    macro.select("parties",{where:"parties_id='"+req.params.id+"'"},res)
})



export default send_document_ep_router;