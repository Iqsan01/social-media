import { Router } from "express";
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from "../controllers/post.controller.js";

const router = Router();


router.post("/", createPost)
router.get("/:id", getPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
router.put("/:id/like", likePost)
router.get("/:id/timeline", getTimelinePosts)


export default router;