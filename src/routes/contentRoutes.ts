import express from "express";
import verifyToken from "../middleware/authMiddleware";
import authorize from "../middleware/roleBase";
import contentController from "../controllers/contentController";

const router = express.Router();

router.post("/add", verifyToken, authorize(["admin", "editor"]), contentController.addContent)

router.get("/", verifyToken, authorize(["admin", "editor", "user"]), contentController.getAllcontent)

router.delete("/:id", verifyToken, authorize(["admin"]), contentController.deleteContent)

router.put("/:id", verifyToken, authorize(["admin"]), contentController.updateContent)

router.get("/:id", verifyToken, authorize(["admin","editor","user"]), contentController.getContentById)

export default router;



