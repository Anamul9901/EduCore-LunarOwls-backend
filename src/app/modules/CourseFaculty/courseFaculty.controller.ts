import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CourseFacultyService } from "./courseFaculty.service";
import { Request, Response } from "express";

const createCourseFaculty = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await CourseFacultyService.createCourseFaculty(
      user as any,
      req.body
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Course Faculty created successfully!",
      data: result,
    });
  }
);

const getAllCourseFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseFacultyService.getAllCourseFaculty();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Course Faculty fetch successfully!",
    data: result,
  });
});

const getAllCourseFacultyByCourseId = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const result = await CourseFacultyService.getAllCourseFacultyByCourseId(
      courseId as string
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Course Faculty fetch successfully!",
      data: result,
    });
  }
);

const deleteFaculty = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await CourseFacultyService.deleteFaculty(
      user as any,
      req.body
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Course Faculty deleted successfully!",
      data: result,
    });
  }
);

const deleteMyFaculty = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await CourseFacultyService.deleteMyFaculty(
      user as any,
      req.body
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Course Faculty deleted successfully!",
      data: result,
    });
  }
);

export const CourseFacultyController = {
  createCourseFaculty,
  getAllCourseFaculty,
  getAllCourseFacultyByCourseId,
  deleteFaculty,
  deleteMyFaculty,
};
