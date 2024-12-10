import express from "express";
import { CourseController } from "./course.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.admin, UserRole.faculty),
  CourseController.createCourse
);

router.get("/", CourseController.getAllCourses);

router.get("/:id", CourseController.getSingleCourse);

router.delete(
  "/:id",
  auth(UserRole.admin, UserRole.faculty),
  CourseController.deleteCourse
);

router.patch(
  "/complite/:id",
  auth(UserRole.admin, UserRole.faculty),
  CourseController.compliteCourse
);


router.patch(
  "/:id",
  auth(UserRole.admin, UserRole.faculty),
  CourseController.updateCourse
);

export const CourseRoutes = router;
