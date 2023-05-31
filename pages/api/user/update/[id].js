import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { response } from "../../../../services/response";
import bcrypt from "bcrypt";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      let newError;
      try {
        if (req.body?.password) {
          const salt = await bcrypt.genSalt(Number(process.env.SALT));
          const hashPassword = await bcrypt.hash(req.body.password, salt);
          req.body.password = hashPassword;
        }
        const user = await User.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (user) {
          return response({ res, status_code: 200, success: true });
        }
        return response({ res, status_code: 400, success: false });
      } catch (error) {
        if (error.code === 11000) {
          if (error.keyPattern?.id_number) {
            newError = {
              ...newError,
              idNumberError: "ID Number already exist!",
            };
          }
        }
        response({ res, status_code: 400, success: false, error: newError });
      }
      break;

    default:
      response({ res, status_code: 400, success: false });
      break;
  }
};
