import express from "express";
import { ClassDataController } from "./classData.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.admin, UserRole.faculty),
  ClassDataController.createCourse
);

router.get(
  "/:classId",
  auth(UserRole.admin, UserRole.faculty, UserRole.student),
  ClassDataController.getAllClassDataByClassId
);

router.patch(
  "/:classDataId",
  auth(UserRole.admin, UserRole.faculty),
  ClassDataController.updateClassData
);

router.delete(
  "/:classDataId",
  auth(UserRole.admin, UserRole.faculty),
  ClassDataController.deleteClassData
);

export const ClassDataRouter = router;
