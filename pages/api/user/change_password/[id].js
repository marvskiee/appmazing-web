import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { response } from "../../../../services/response";
import bcrypt from "bcrypt";
import moment from "moment";
dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (req.method) {
    case "PUT":
      try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(
          req.body?.last_name.toLowerCase() +
            moment(req.body?.birthday).format("MMDDYY"),
          salt
        );
        const user = await User.findByIdAndUpdate(
          { _id: id },
          {
            password: hashPassword,
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (user) {
          return res.status(200).json({ success: true });
        }
        return res.status(400).json({
          success: false,
          errors: {
            oldPasswordError: "User doesn't exist!",
          },
        });
      } catch (error) {
        const err = error.errors;
        res.status(400).json({
          success: false,
          errors: {
            newPasswordError: err?.password?.message,
          },
        });
      }
      break;
    default:
      response({ res, status_code: 400, success: false });
      break;
  }
};
