import { UserStatus } from "@prisma/client";
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




export const EnrolmentStudentService = {
  createEnrolmentStudent,
};
