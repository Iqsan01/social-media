import {Router} from "express";
import { deleteUser, followUser, getUser, unFollowUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/:id", verifyToken, getUser);
router.put("/:id", updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unFollowUser);


export default router;

