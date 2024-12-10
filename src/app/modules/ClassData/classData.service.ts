import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const createClassData = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  await prisma.courseClass.findUniqueOrThrow({
    where: {
      id: payload.classId,
    },
  });

  const result = await prisma.classData.create({
    data: {
      ...payload,
      facultyId: userData.id,
    },
  });

  return result;
};

const getAllClassDataByClassId = async (user: any, classId: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
    include: {
      courseClass: true,
      courseEnrollment: true,
    },
  });

  const classData = await prisma.courseClass.findUniqueOrThrow({
    where: {
      id: classId,
      isDeleted: false,
    },
  });

  if (userData.role === UserRole.faculty) {
    if (classData.facultyId !== userData.id) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "This is not your class");
    }
  } else if (userData.role === UserRole.student) {
    const isEnrolledInCourse = userData?.courseEnrollment.some(
      (enrollment) =>
        enrollment.courseId === classData.courseId &&
        enrollment.isActive &&
        !enrollment.isDeleted
    );

    if (!isEnrolledInCourse) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "You are not enrolled in this course"
      );
    }
  }

  const restul = await prisma.classData.findMany({
    where: {
      classId,
    },
  });

  return restul;
};

const updateClassData = async (user: any, classDataId: string, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
    include: {
      courseClass: true,
    },
  });

  const classData = await prisma.classData.findUniqueOrThrow({
    where: {
      id: classDataId,
    },
  });

  if (userData.role === UserRole.faculty) {
    if (classData.facultyId !== userData.id) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "This is not your class");
    }
  }

  const result = await prisma.classData.update({
    where: {
      id: classDataId,
    },
    data: payload,
  });

  return result;
};

const deleteClassData = async (user: any, classDataId: string) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
          email: user.email,
          status: UserStatus.active,
        },
        include: {
          courseClass: true,
        },
      });
    
      const classData = await prisma.classData.findUniqueOrThrow({
        where: {
          id: classDataId,
        },
      });
    
      if (userData.role === UserRole.faculty) {
        if (classData.facultyId !== userData.id) {
          throw new ApiError(StatusCodes.UNAUTHORIZED, "This is not your class");
        }
      }
  const result = await prisma.classData.delete({
    where: {
      id: classDataId,
    },
  });

  return result;
};

export const ClassDataService = {
  createClassData,
  getAllClassDataByClassId,
  updateClassData,
  deleteClassData,
};
