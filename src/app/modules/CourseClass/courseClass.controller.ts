import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { CourseClassService } from "./courseClass.service";

const createClass = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await CourseClassService.createClass(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Class created successfully!",
    data: result,
  });
});

const getAllClassByCourseId = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const user = (req as any).user;
    const result = await CourseClassService.getAllClassByCourseId(
      user,
      courseId
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Class fetchd successfully!",
      data: result,
    });
  }
);

const deleteClass = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { classId } = req.params;
  const result = await CourseClassService.deleteClass(user, classId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Class deleted successfully!",
    data: null,
  });
});

const updateClass = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { classId } = req.params;
  const result = await CourseClassService.updateClass(user, classId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Class updated successfully!",
    data: result,
  });
});

export const CourseClassController = {
  createClass,
  getAllClassByCourseId,
  deleteClass,
  updateClass,
};
