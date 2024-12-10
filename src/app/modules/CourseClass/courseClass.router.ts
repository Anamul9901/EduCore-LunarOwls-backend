import express from "express";
import { CourseClassController } from "./courseClass.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.faculty, UserRole.admin),
  CourseClassController.createClass
);

router.get(
  "/:courseId",
  auth(UserRole.faculty, UserRole.admin, UserRole.student),
  CourseClassController.getAllClassByCourseId
);

router.delete(
  "/:classId",
  auth(UserRole.faculty, UserRole.admin),
  CourseClassController.deleteClass
);

router.patch(
  "/:classId",
  auth(UserRole.faculty, UserRole.admin),
  CourseClassController.updateClass
);

export const CourseClassRoutes = router;
