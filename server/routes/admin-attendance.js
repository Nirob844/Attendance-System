const router = require("express").Router();
import {
  getDisable,
  getEnable,
  getStatus,
} from "../controller/admin-attendance";

router.get("/enable", getEnable);
router.get("/disable", getDisable);
router.get("/status", getStatus);

export default router;
