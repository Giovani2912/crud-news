import express from "express";
import { 
    createNew, 
    deleteNew, 
    readAllNews, 
    readUniqueNew, 
    updateNew 
} from "../controllers/newController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", createNew);

router.get("/:id", readUniqueNew);

router.get("/", readAllNews);

router.put("/:id", updateNew);

router.delete("/:id", deleteNew);

export default router;
