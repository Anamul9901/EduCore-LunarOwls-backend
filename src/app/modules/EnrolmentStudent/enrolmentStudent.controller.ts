import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { EnrolmentStudentService } from "./enrolmentStudent.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createEnrolmentStudent = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await EnrolmentStudentService.createEnrolmentStudent(
      user,
      req.body
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Enroled successfully!",
      data: result,
    });
  }
);

const getAllEnrolmentStudent = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EnrolmentStudentService.getAllEnrolmentStudent();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Enroled student fetch successfully!",
      data: result,
    });
  }
);


const getAllEnrolmentStudentByCourseId = catchAsync(
    async (req: Request, res: Response) => {
        const {courseId} = req.params;
      const result = await EnrolmentStudentService.getAllEnrolmentStudentByCourseId(courseId);
  
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Enroled student fetch successfully!",
        data: result,
      });
    }
  );


export const EnrolmentStudentController = {
  createEnrolmentStudent,
  getAllEnrolmentStudent,
  getAllEnrolmentStudentByCourseId,
};
