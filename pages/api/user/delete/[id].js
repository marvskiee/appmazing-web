import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { response } from "../../../../services/response";
import bcrypt from "bcrypt";
dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (req.method) {
    case "DELETE":
      try {
        const admin = await User.findByIdAndDelete(id);
        if (admin) return res.status(200).json({ success: true });
        else
          return res.status(400).json({
            success: false,
            errors: "User does not exist.",
          });
      } catch (error) {
        res.status(400).json({
          success: false,
          error,
        });
      }
      break;
    default:
      response({ res, status_code: 400, success: false });
      break;
  }
};
