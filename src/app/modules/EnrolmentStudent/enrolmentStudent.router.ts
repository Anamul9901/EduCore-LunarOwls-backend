import express from "express";
import { EnrolmentStudentController } from "./enrolmentStudent.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.student),
  EnrolmentStudentController.createEnrolmentStudent
);

router.get("/", EnrolmentStudentController.getAllEnrolmentStudent);

router.get(
  "/:courseId",
  EnrolmentStudentController.getAllEnrolmentStudentByCourseId
);
router.get(
  "/my-enrolld/data", auth(UserRole.student),
  EnrolmentStudentController.getAllEnrolmentStudentByStudentId
);



export const EnrolmentStudentRoutes = router;
