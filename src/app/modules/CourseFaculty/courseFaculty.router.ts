import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { CourseFacultyController } from "./courseFaculty.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.admin, UserRole.faculty),
  CourseFacultyController.createCourseFaculty
);

router.get("/", CourseFacultyController.getAllCourseFaculty);

router.get("/:courseId", CourseFacultyController.getAllCourseFacultyByCourseId);

router.delete(
  "/",
  auth(UserRole.admin),
  CourseFacultyController.deleteFaculty
);

router.delete(
  "/my-faculty",
  auth(UserRole.faculty),
  CourseFacultyController.deleteFaculty
);

export const CourseFacultyRoutes = router;
