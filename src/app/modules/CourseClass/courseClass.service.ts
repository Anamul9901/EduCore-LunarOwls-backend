import { StatusCodes } from "http-status-codes";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { UserRole, UserStatus } from "@prisma/client";

const createClass = async (user: any, payload: any) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!userData) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "unauthorised");
  }

  const courseData = await prisma.course.findUniqueOrThrow({
    where: {
      id: payload.courseId,
      isDeleted: false,
      isActive: true,
    },
    include: {
      courseFaculty: true,
    },
  });

  if (userData.role === UserRole.faculty) {
    const isFacultyForCourse = courseData.courseFaculty.some(
      (faculty) => faculty.facultyId === userData.id
    );

    if (userData.id !== courseData.creatorId && !isFacultyForCourse) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "This is not your course");
    }
  }

  const result = await prisma.courseClass.create({
    data: { ...payload, facultyId: userData.id },
  });

  return result;
};

const getAllClassByCourseId = async (user: any, courseId: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
    include: {
      courseEnrollment: true,
    },
  });

  const courseData = await prisma.course.findUniqueOrThrow({
    where: {
      id: courseId,
      isDeleted: false,
    },
    include: {
      courseFaculty: true,
    },
  });

  // check the faculty is valid for this course
  if (userData.role === UserRole.faculty) {
    const isFacultyForCourse = courseData?.courseFaculty.some(
      (faculty) => faculty.facultyId === userData.id
    );

    if (userData.id !== courseData.creatorId && !isFacultyForCourse) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "This is not your course");
    }
  }

  // check the student is valid for this course
  if (userData.role === UserRole.student) {
    const isEnrolledInCourse = userData?.courseEnrollment.some(
      (enrollment) =>
        enrollment.courseId === courseData.id &&
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

  const result = await prisma.courseClass.findMany({
    where: {
      courseId: courseId,
    },
  });
  return result;
};

const deleteClass = async (user: any, classId: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const classData = await prisma.courseClass.findUniqueOrThrow({
    where: {
      id: classId,
      isDeleted: false,
    },
  });

  if (
    userData.role === UserRole.faculty &&
    userData.id != classData.facultyId
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "This is not your class");
  }

  const result = await prisma.courseClass.update({
    where: {
      id: classId,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

const updateClass = async (user: any, classId: string, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const classData = await prisma.courseClass.findUniqueOrThrow({
    where: {
      id: classId,
      isDeleted: false,
    },
  });

  if (
    userData.role === UserRole.faculty &&
    userData.id != classData.facultyId
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "This is not your class");
  }

  const result = await prisma.courseClass.update({
    where: {
      id: classId,
    },
    data: payload,
  });

  return result;
};

export const CourseClassService = {
  createClass,
  getAllClassByCourseId,
  deleteClass,
  updateClass,
};
