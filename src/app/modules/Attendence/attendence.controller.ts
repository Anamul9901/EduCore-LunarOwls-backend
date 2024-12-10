import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AttendenceService } from "./attendence.service";
import { StatusCodes } from "http-status-codes";

const createAttendence = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await AttendenceService.createAttendence(user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Attendence Created Successfully",
    data: result,
  });
});

const finAllAttendenceByClassId = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await AttendenceService.finAllAttendenceByClassId(
      user,
      req.body
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Attendence fetch Successfully",
      data: result,
    });
  }
);

const findOneByStudentAndClassId = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const { studentId, classId } = req.params;
    const result = await AttendenceService.findOneByStudentAndClassId(
      user,
      studentId,
      classId
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Attendence fetch Successfully",
      data: result,
    });
  }
);

const deleteAttendence = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { studentId} = req.params;
  const result = await AttendenceService.deleteAttendence(user,studentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Attendence deleted Successfully",
    data: result,
  });
});

export const AttendenceController = {
  createAttendence,
  finAllAttendenceByClassId,
  findOneByStudentAndClassId,
  deleteAttendence,
};
