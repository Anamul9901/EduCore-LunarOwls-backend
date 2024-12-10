import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { AttendenceController } from "./attendence.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.admin, UserRole.faculty),
  AttendenceController.createAttendence
);

router.get(
  "/:classId",
  auth(UserRole.admin, UserRole.faculty),
  AttendenceController.finAllAttendenceByClassId
);
router.get(
  "/:classId/:studentId",
  auth(UserRole.admin, UserRole.faculty, UserRole.student),
  AttendenceController.findOneByStudentAndClassId
);

router.delete(
  "/:studentId",
  auth(UserRole.admin, UserRole.faculty),
  AttendenceController.deleteAttendence
);

export const AttendenceRoutes = router;


