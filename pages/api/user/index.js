import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { response } from "../../../services/response";
import bcrypt from "bcrypt";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const all_user = await User.find({ role: { $in: [1, 0] } }).sort();
        response({ res, status_code: 200, success: true, data: all_user });
      } catch (error) {
        response({ res, status_code: 400, success: false, error });
      }
      break;
    case "POST":
      const { first_name, last_name, password, gender, role, id_number } =
        req.body;
      let newError = {};
      if (id_number?.trim() == "" || id_number == undefined) {
        newError = { ...newError, idNumberError: "Please enter id_number!" };
      }

      if (first_name?.trim() == "" || first_name == undefined) {
        newError = { ...newError, firstNameError: "Please enter first_name!" };
      }

      if (last_name?.trim() == "" || last_name == undefined) {
        newError = { ...newError, lastNameError: "Please enter last_name!" };
      }

      if (password?.trim() == "" || password == undefined) {
        newError = { ...newError, passwordError: "Please enter password!" };
      }

      if (gender?.trim() == "" || gender == undefined) {
        newError = { ...newError, genderError: "Please enter gender!" };
      }

      if (role?.toString().trim() == "" || role == undefined) {
        newError = { ...newError, roleError: "Please enter role!" };
      }

      if (Object.keys(newError).length > 0) {
        return response({
          res,
          status_code: 400,
          success: false,
          error: newError,
        });
      } else {
        try {
          const salt = await bcrypt.genSalt(Number(process.env.SALT));
          const hashPassword = await bcrypt.hash(req.body.password, salt);
          const user = await User.create({
            ...req.body,
            password: hashPassword,
          });
          return response({ res, status_code: 201, success: true, data: user });
        } catch (error) {
          if (error.code === 11000) {
            if (error.keyPattern?.id_number) {
              newError = {
                ...newError,
                idNumberError: "User already exist!",
              };
            }
          }
          return response({ res, status_code: 400, success: false, error: newError });
        }
      }

    default:
      response({ res, status_code: 400, success: false });
      break;
  }
};
