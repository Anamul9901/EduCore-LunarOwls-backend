import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { GradeService } from "./grade.service";

const createCourse = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await GradeService.createGratd(user, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Grade created successfully!",
      data: result,
    });
  }
);

const getAllGradeByCourseId = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const { courseId } = req.params;
    const result = await GradeService.getAllGradeByCourseId(
      user,
      courseId as string
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Grade fetch successfully!",
      data: result,
    });
  }
);

const getOneGradeByStudentId = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const { studentId, courseId } = req.params;
    const result = await GradeService.getOneGradeByStudentId(
      user,
      studentId as string,
      courseId as string
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Grade fetch successfully!",
      data: result,
    });
  }
);
const deleteGrade = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const { studentId, courseId } = req.params;
    const result = await GradeService.deleteGrade(
      user,
      studentId as string,
      courseId as string
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Grade delete successfully!",
      data: result,
    });
  }
);

export const GradeController = {
  createCourse,
  getAllGradeByCourseId,
  getOneGradeByStudentId,deleteGrade
};
