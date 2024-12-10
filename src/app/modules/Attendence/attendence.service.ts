import { classData } from "./../../../../node_modules/.prisma/client/index.d";
import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const createAttendence = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const classData = await prisma.courseClass.findUniqueOrThrow({
    where: {
      id: payload.classId,
      isDeleted: false,
    },
  });

  const courseData = await prisma.course.findUniqueOrThrow({
    where: {
      id: classData.courseId,
      isDeleted: false,
    },
  });

  const studentData = await prisma.user.findUnique({
    where: {
      id: payload.studentId,
      status: UserStatus.active,
      role: UserRole.student,
    },
  });

  if (!studentData) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Student not found");
  }

  const enrollmentStudent = await prisma.courseEnrollment.findMany({
    where: {
      studentId: studentData.id,
      courseId: courseData.id,
      isDeleted: false,
    },
  });

  if (!enrollmentStudent.length) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "You are not enrolled in this course"
    );
  }

  const result = await prisma.attendence.create({
    data: payload,
  });

  return result;
};

const finAllAttendenceByClassId = async (user: any, classId: string) => {
  const result = await prisma.attendence.findMany({
    where: {
      classId,
    },
  });

  return result;
};

const findOneByStudentAndClassId = async (
  user: any,
  studentId: string,
  classId: string
) => {
  const result = await prisma.attendence.findMany({
    where: {
      studentId,
      classId,
    },
  });

  return result;
};

const deleteAttendence = async (user: any, studentId: string) => {
  console.log("third");

  const result = await prisma.attendence.deleteMany({
    where: {
      studentId,
    },
  });

  return result;
};

export const AttendenceService = {
  createAttendence,
  finAllAttendenceByClassId,
  findOneByStudentAndClassId,
  deleteAttendence,
};
