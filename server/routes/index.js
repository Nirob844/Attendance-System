const router = require("express").Router();
import authenticate from "../middleware/authenticate";
import adminAttendanceRoutes from "./admin-attendance";
import authRoutes from "./auth";
import studentAttendanceRoutes from "./student-attendance";
import usersRoutes from "./users";

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", authenticate, usersRoutes);
router.use("/api/v1/admin/attendance", authenticate, adminAttendanceRoutes);
router.use("/api/v1/student/attendance", authenticate, studentAttendanceRoutes);

export default router;
