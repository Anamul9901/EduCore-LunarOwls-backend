import { UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createEnrolmentStudent = async (user: any, payload: any) => {
  console.log("cre", user, payload);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const courseData = await prisma.course.findUniqueOrThrow({
    where: {
      id: payload.courseId,
      isActive: true,
      isDeleted: false,
    },
  });

  const result = await prisma.courseEnrollment.create({
    data: {
      studentId: userData.id,
      courseId: courseData.id,
    },
  });

  return result;
};

const getAllEnrolmentStudent = async () => {
  const result = await prisma.courseEnrollment.findMany();
  return result;
};

const getAllEnrolmentStudentByCourseId = async (courseId: string) => {
  await prisma.course.findUniqueOrThrow({
    where: {
      id: courseId,
      isActive: true,
      isDeleted: false,
    },
  });
  const result = await prisma.courseEnrollment.findMany({
    where: {
      courseId,
    },
  });
  return result;
};

const getAllEnrolmentStudentByStudentId = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
      role: UserRole.student,
    },
  });
  console.log(userData)
  const result = await prisma.courseEnrollment.findMany({
    where: {
      studentId: userData.id,
    },include: {
      course: true
    }
  });
  return result;
};

export const EnrolmentStudentService = {
  createEnrolmentStudent,
  getAllEnrolmentStudent,
  getAllEnrolmentStudentByCourseId,
  getAllEnrolmentStudentByStudentId
};
