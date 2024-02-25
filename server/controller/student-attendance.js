import { addMinutes, isAfter } from "date-fns";
import { findById, findOne } from "../models/AdminAttendance";
import StudentAttendance, {
  findOne as _findOne,
} from "../models/StudentAttendance";
import error from "../utils/error";

const getAttendance = async (req, res, next) => {
  const { id } = req.params;

  try {
    /**
     * Step 1 - Find admin attendance by id
     * Step 2 - Check if it is running or not
     * Step 3 - Check already register or not
     * Step 4 - Register entry
     */

    const adminAttendance = await findById(id);

    if (!adminAttendance) {
      throw error("Invalid Attendance ID", 400);
    }

    if (adminAttendance.status === "COMPLETED") {
      throw error("Attendance already completed");
    }

    let attendance = await _findOne({
      adminAttendance: id,
      user: req.user._id,
    });

    if (attendance) {
      throw error("Already registered", 400);
    }

    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });

    await attendance.save();
    return res.status(201).json(attendance);
  } catch (e) {
    next(e);
  }
};

const getAttendanceStatus = async (req, res, next) => {
  try {
    const running = await findOne({ status: "RUNNING" });

    if (!running) {
      throw error("Not Running", 400);
    }

    const started = addMinutes(new Date(running.createdAt), running.timeLimit);

    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }

    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

export default {
  getAttendance,
  getAttendanceStatus,
};
