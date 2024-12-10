import express from "express";
import { UserRouter } from "../modules/User/user.router";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { CourseRoutes } from "../modules/Course/course.router";
import { CourseFacultyRoutes } from "../modules/CourseFaculty/courseFaculty.router";
import { CourseClassRoutes } from "../modules/CourseClass/courseClass.router";
import { EnrolmentStudentRoutes } from "../modules/EnrolmentStudent/enrolmentStudent.router";
import { ClassDataRouter } from "../modules/ClassData/classData.router";
import { AttendenceRoutes } from "../modules/Attendence/attendence.router";
import { GradeRoutes } from "../modules/StudentGrade/grade.router";

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
  {
    path: "/enrolment-student",
    route: EnrolmentStudentRoutes,
  },
  {
    path: "/class",
    route: CourseClassRoutes,
  },
  {
    path: "/class-data",
    route: ClassDataRouter,
  },
  {
    path: "/attendence",
    route: AttendenceRoutes,
  },
  {
    path: "/grade",
    route: GradeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
