import express from "express";
import mediaController from "../controllers/mediaController";
import verifyToken from "../middleware/authMiddleware";
import upload from "../middleware/multer";
import authorize from "../middleware/roleBase";

const router = express.Router();

router.post("/upload", verifyToken, authorize(["admin", "editor"]), upload.single("media"), mediaController.uploadMedia);

router.get("/", verifyToken, mediaController.getAllMedia);

router.get("/:id", verifyToken, mediaController.getMediaById);

router.delete("/:id", verifyToken, authorize(["admin"]), mediaController.deleteMedia);

router.put("/:id", verifyToken, authorize(["admin", "editor"]), upload.single("media"), mediaController.updateMedia);

export default router;
