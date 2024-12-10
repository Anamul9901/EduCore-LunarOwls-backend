import { Prisma, UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import { Secret } from "jsonwebtoken";
import configs from "../../../configs";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { userSearchAbleFields } from "./user.constant";

const createUser = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  payload.password = hashedPassword;

  const result = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNumber: true,
      address: true,
      status: true,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    { email: result.email, role: result.role },
    configs.jwt.jwt_secret as Secret,
    configs.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    { email: result.email, role: result.role },
    configs.jwt.refresh_token_secret as Secret,
    configs.jwt.refresh_token_expires_in as string
  );
  return { result, accessToken, refreshToken };
};

const getAllUser = async (user: any, params: any, options: any) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      role: UserRole.admin,
    },
  });

  const { searchTerm, ...filterData } = params;
  //   console.log(filterData); //* aikhane upore destracture korar karone, searchTerm bade onno gulu show korbe
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePaginatin(options);
  // console.log({ limit, page, sortBy, sortOrder });

  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
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
    status: { notIn: [UserStatus.deleted] },
  });

  //   console.dir(andConditions, {depth: 'indinity'})

  const whereContitions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
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
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNumber: true,
      address: true,
      status: true,
    },
  });

  return result;
};

const getSingleUser = async (user: any) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNumber: true,
      address: true,
      status: true,
    },
  });

  return result;
};

const updateMyData = async (user: any, payload: any) => {
  const updatedData = {
    name: payload.name,
    contactNumber: payload.contactNumber,
    address: payload.address,
    gender: payload.gender,
  };
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.active,
    },
  });
  const result = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: updatedData,
  });

  return result;
};

const softDeleteUser = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
      status: { notIn: [UserStatus.deleted] },
    },
  });

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: UserStatus.deleted,
    },
  });

  // if (userData.role == "vendor") {
  //   try {
  //     const shopData = await prisma.shop.findUnique({
  //       where: {
  //         userId: id,
  //       },
  //     });
  //     if (shopData?.id) {
  //       const deleteAllProduct = await prisma.product.updateMany({
  //         where: {
  //           shopId: shopData?.id,
  //         },
  //         data: {
  //           isDeleted: true,
  //         },
  //       });
  //     }
  //     const deleteOrder = await prisma.followUnfollow.deleteMany({
  //       where: {
  //         shopId: shopData?.id,
  //       },
  //     });
  //     const deleteOrderProduct = await prisma.cartItem.deleteMany({
  //       where: {
  //         userEmail: userData?.email,
  //       },
  //     });
  //     const deleteShop = await prisma.shop.delete({
  //       where: {
  //         id: shopData?.id,
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  return result;
};

export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateMyData,
  softDeleteUser,
};
