import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { response } from "../../../services/response";

dbConnect();

const secret = process.env.SECRET;

export default async (req, res) => {
  const { id_number, password } = req.body;
  let newError = {};
  if (id_number?.trim() == "" || id_number == undefined) {
    newError = { ...newError, idNumberError: "Please enter id_number!" };
  }
  if (password?.trim() == "" || password == undefined) {
    newError = { ...newError, passwordError: "Please enter password!" };
  }
  if (
    newError.hasOwnProperty("id_numberError") ||
    newError.hasOwnProperty("passwordError")
  ) {
    return response({ res, status_code: 400, success: false, error: newError });
  } else {
    let result = null;
    try {
      const user = await User.findOne({
        id_number,
        role: 0,
      });

      const decryptPassword = await bcrypt.compare(password, user.password);
      if (decryptPassword) {
        result = user;
      } else {
        result = null;
      }
    } catch (error) {}
    console.log(result);
    if (result) {
      try {
        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            id: result._id,
            role: "admin",
          },
          secret
        );
        const serialized = serialize("OursiteJWT", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        res.setHeader("Set-Cookie", serialized);
        res.status(200).json({ success: true, data: result });
      } catch (e) {
        return response({
          res,
          status_code: 400,
          success: false,
          error: newError,
        });
      }
    } else {
      res.json({
        success: false,
        errors: { id_numberError: "Wrong password or id_number!" },
      });
    }
  }
};
