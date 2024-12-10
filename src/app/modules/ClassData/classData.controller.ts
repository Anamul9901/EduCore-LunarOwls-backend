import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { ClassDataService } from "./classData.service";
import { AnyARecord } from "dns";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await ClassDataService.createClassData(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Class data create successfully!",
    data: result,
  });
});

const getAllClassDataByClassId = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const { classId } = req.params;
    const result = await ClassDataService.getAllClassDataByClassId(
      user,
      classId
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Class data fetchd successfully!",
      data: result,
    });
  }
);

const updateClassData = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { classDataId } = req.params;

  const result = await ClassDataService.updateClassData(
    user,
    classDataId,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Class data updated successfully!",
    data: result,
  });
});

const deleteClassData = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { classDataId } = req.params;
  const result = await ClassDataService.deleteClassData(user, classDataId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Class data deleted successfully!",
    data: result,
  });
});

export const ClassDataController = {
  createCourse,
  getAllClassDataByClassId,
  updateClassData,
  deleteClassData,
};
