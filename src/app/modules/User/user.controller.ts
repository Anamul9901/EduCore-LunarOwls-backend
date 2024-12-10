import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body as any);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const user = (req as any)?.user;
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserService.getAllUser(user as any, filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User fetch successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = (req as any).user;
  const result = await UserService.getSingleUser(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "user fetch successfully",
    data: result,
  });
});

const updateMyData = catchAsync(async (req, res) => {
  const user = (req as any).user;
  const result = await UserService.updateMyData(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "user update successfully",
    data: result,
  });
});

const softDeleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.softDeleteUser(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "user delete successfully",
    data: null,
  });
});

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateMyData,
  softDeleteUser,
};
