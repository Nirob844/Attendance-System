const router = require("express").Router();
import {
  deleteUserById,
  getUserById,
  getUsers,
  patchUserById,
  postUser,
  putUserById,
} from "../controller/users";

router.get("/:userId", getUserById);
router.put("/:userId", putUserById);
router.patch("/:userId", patchUserById);
router.delete("/:userId", deleteUserById);
router.get("/", getUsers);
router.post("/", postUser);

export default router;
