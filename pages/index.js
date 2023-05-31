import React, { useEffect, useRef, useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { authLogin } from "../services/auth.services";
import toast, { Toaster } from "react-hot-toast";
import { toastOptions } from "../styles/modalOptions";
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
const Login = () => {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const idNumberRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.dismiss();
    // check the credential firsts
    let error_id;
    if (
      idNumberRef.current.value.trim() == "" ||
      passwordRef.current.value.trim() == ""
    ) {
      error_id = toast.error(
        "Wrong ID Number or password, Please try again! ",
        toastOptions
      );
      return;
    }
    const credentials = {
      id_number: idNumberRef.current.value,
      password: passwordRef.current.value,
    };
    //do something else
    const { success, errors, data } = await authLogin(credentials);

    if (!success) {
      toast.error(
        "Wrong username or password, Please try again! ",
        toastOptions
      );
      setIsLoading(false);
    } else {
      router.push("/students");
      await dispatch({ type: "LOGIN_SUCCESS", value: data });
    }
  };

  return (
    <div className="bg-cstmgray min-h-screen flex items-center justify-center p-6">
      <div className="font-work overflow-hidden rounded-2xl bg-white w-screen max-w-[25rem] shadow-md">
        <div className="font-work p-10 pt-5 bg-white -2xl">
          <div className="flex items-center justify-center my-2">
            <Image src="/logo.png" alt="banner" width={100} height={100} />
          </div>
          <h1 className="uppercase text-center mb-2 font-semibold text-2xl">
            app-mazing login
          </h1>
          <form className="flex flex-col gap-4" onSubmit={loginHandler}>
            <div>
              <Label
                htmlFor="ID Number"
                value="ID Number"
                className=" font-work"
              />
              <TextInput
                id="username"
                type="text"
                icon={BiUserCircle}
                placeholder="ID Number"
                className="mt-1 outline-primary"
                required={true}
                ref={idNumberRef}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label
                htmlFor="password1"
                value="Password"
                className=" font-work"
              />
              <div className="relative">
                <TextInput
                  id="password1"
                  type={!showPassword ? "password" : "text"}
                  className="mt-1"
                  icon={RiLockPasswordFill}
                  placeholder="Password"
                  required={true}
                  ref={passwordRef}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-[.85rem]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <BsFillEyeSlashFill className="bg-gray" />
                  ) : (
                    <BsFillEyeFill className="bg-gray" />
                  )}
                </button>
              </div>
            </div>
            <button
              disabled={isLoading}
              className="bg-primary px-4 py-2 rounded-md text-white font-semibold"
              type="submit"
            >
              {isLoading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
