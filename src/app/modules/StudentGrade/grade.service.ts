import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const createGratd = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const enrollmentCheck = await prisma.courseEnrollment.findMany({
    where: {
      studentId: payload.studentId,
      courseId: payload.courseId,
    },
  });

  if (!enrollmentCheck.length) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "This student is not enrolled in this course"
    );
  }

  const result = await prisma.grade.create({
    data: payload,
  });

  return result;
};

const getAllGradeByCourseId = async (user: any, courseId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const result = await prisma.grade.findMany({
    where: {
      courseId: courseId,
    },
  });

  return result;
};

const getOneGradeByStudentId = async (
  user: any,
  studentId: string,
  courseId: string
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const result = await prisma.grade.findMany({
    where: {
      courseId: courseId,
      studentId: studentId,
    },
  });

  return result;
};

const deleteGrade = async (user: any, studentId: string, courseId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const result = await prisma.grade.deleteMany({
    where: {
      courseId: courseId,
      studentId: studentId,
    },
  });

  return result;
};

export const GradeService = {
  createGratd,
  getAllGradeByCourseId,
  getOneGradeByStudentId,
  deleteGrade
};
