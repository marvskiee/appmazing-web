import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { response } from "../../../services/response";
import bcrypt from "bcrypt";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const user = await User.findById(req.query.id);
        if (user)
          return response({
            res,
            status_code: 200,
            success: true,
            data: user,
          });
        else response({ res, status_code: 400, success: false });
      } catch (error) {
        response({ res, status_code: 400, success: false, error });
      }
      break;

    default:
      response({ res, status_code: 400, success: false });
      break;
  }
};
