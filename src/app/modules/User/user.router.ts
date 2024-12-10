import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", auth(UserRole.admin), UserController.getAllUser);

router.post("/", UserController.createUser);

router.get(
  "/me",
  auth(UserRole.faculty, UserRole.admin, UserRole.student),
  UserController.getSingleUser
);

router.patch(
  "/me",
  auth(UserRole.faculty, UserRole.admin, UserRole.student),
  UserController.updateMyData
);

router.delete("/soft/:id", auth(UserRole.admin), UserController.softDeleteUser);

export const UserRouter = router;
