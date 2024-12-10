import express from "express";
import { UserRouter } from "../modules/User/user.router";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { CourseRoutes } from "../modules/Course/course.router";
import { CourseFacultyRoutes } from "../modules/CourseFaculty/courseFaculty.router";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/courses-faculty",
    route: CourseFacultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
