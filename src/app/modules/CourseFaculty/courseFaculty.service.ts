import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const createCourseFaculty = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const facultyData = await prisma.user.findUnique({
    where: {
      id: payload.facultyId,
      status: UserStatus.active,
      role: UserRole.faculty,
    },
  });
  if (!facultyData) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Faculty not found");
  }

  const courseData = await prisma.course.findFirstOrThrow({
    where: {
      id: payload.courseId,
      isActive: true,
      isDeleted: false,
    },
  });

  const result = await prisma.courseFaculty.create({
    data: payload,
  });
  return result;
};

const getAllCourseFaculty = async () => {
  const result = await prisma.courseFaculty.findMany();
  return result;
};

const getAllCourseFacultyByCourseId = async (courseId: string) => {
  const result = await prisma.courseFaculty.findMany({
    where: {
      courseId,
    },
  });
  return result;
};

const deleteFaculty = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const result = await prisma.courseFaculty.delete({
    where: {
      facultyId_courseId: {
        facultyId: payload.facultyId,
        courseId: payload.courseId,
      },
    },
  });
};

const deleteMyFaculty = async (user: any, payload: any) => {
  const facultyData = await prisma.user.findUnique({
    where: {
      email: user.email,
      status: UserStatus.active,
      role: UserRole.faculty,
    },
  });

  if (!facultyData) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Faculty not found");
  }

  const result = await prisma.courseFaculty.delete({
    where: {
      facultyId_courseId: {
        facultyId: facultyData.id,
        courseId: payload.courseId,
      },
    },
  });
};

export const CourseFacultyService = {
  createCourseFaculty,
  getAllCourseFaculty,
  getAllCourseFacultyByCourseId,
  deleteFaculty,
  deleteMyFaculty,
};
