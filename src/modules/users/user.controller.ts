import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



// const rgisterUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;

//     const user = await userService.rigisterUserIntoDB(payload);

//     res.status(httpStatus.CREATED).json({
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: "User created successfully",
//       data: user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//       message: "Something went wrong",
//       error: (error as Error).message,
//     });
//   }
// };



const rgisterUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const user = await userService.rigisterUserIntoDB(payload);
//   res.status(httpStatus.CREATED).json({
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "User created successfully",
//     data: user,
//   });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User created successfully",
    data: {
        user
    }
  });
})
export const userController = {
  rgisterUser,
};
