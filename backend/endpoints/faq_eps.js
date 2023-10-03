const faq_ep_router = express.Router();
faq_ep_router.use(cors());
faq_ep_router.use(express.json());
const macros = new ep_macros();

faq_ep_router.get("/:id", (req, res) =>{
    macros.query("SELECT * FROM faq WHERE faq_id = ?",[req.params.id],res)
})


export default faq_ep_router
