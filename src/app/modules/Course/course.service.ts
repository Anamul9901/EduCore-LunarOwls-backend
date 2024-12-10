import { Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { courseSearchAbleFields } from "./course.constant";

const createCourse = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  const result = await prisma.course.create({
    data: { ...payload, creatorId: userData.id },
  });
  return result;
};

const getAllCourses = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePaginatin(options);

  const andConditions: Prisma.CourseWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: courseSearchAbleFields.map((field) => ({
        [field]: {
          contains: params?.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //   console.log(Object.keys(filterData)); // aikhane key gulu array akare debe
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  //   console.dir(andConditions, {depth: 'indinity'})

  const whereContitions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.course.findMany({
    where: whereContitions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await prisma.course.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

const deleteCourse = async (user: any, id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  await prisma.course.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.course.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

const compliteCourse = async (user: any, id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });
  await prisma.course.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.course.update({
    where: {
      id,
      isDeleted: false,
    },
    data: {
      isActive: false,
    },
  });
  return result;
};

const updateCourse = async (user: any, id: string, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });

  await prisma.course.findUniqueOrThrow({
    where: {
      id,
      isActive: true,
      isDeleted: false,
    },
  });

  const result = await prisma.course.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });
  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  compliteCourse,
  updateCourse,
};
