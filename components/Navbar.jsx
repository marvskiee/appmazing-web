import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "flowbite-react";
import Link from "next/link";
import { AvatarModal } from "./navbar/AvatarModal";
import { BiLogOut } from "react-icons/bi";
import { TfiMenu } from "react-icons/tfi";
import { authLogout, getUser } from "../services/auth.services";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/router";
import { toastOptions } from "../styles/modalOptions";
import Image from "next/image";
const Navbar = ({ activePage }) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const load = async () => {
      if (!state.isAuth) {
        const res = await getUser();
        await dispatch({ type: "SET_USER", value: res?.data });
      }
    };
    load();
  }, [state.isAuth]);

  const logoutHandler = async () => {
    setIsLoading(true);
    toast.dismiss();
    await dispatch({ type: "LOGIN_REQUEST" });
    // toast.loading("Logging Out, Please wait.");
    const { success, message } = await authLogout();
    toast.dismiss();
    if (!success) {
      await dispatch({ type: "LOGIN_ERROR", value: { error: message } });
      toast.error(message, {
        duration: 1500,
      });
      setIsLoading(false);
    } else {
      await dispatch({ type: "LOGOUT" });
      router.push("/");
    }
  };
  return (
    <div className="z-10 sticky top-0 flex flex-col items-center bg-cstmgray p-6 py-5">
      <div className="flex-wrap w-full flex items-center justify-between gap-5 max-w-[80rem] ">
        <Link href="/dashboard">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center my-2">
              <Image src="/logo.png" alt="banner" width={40} height={40} />
            </div>
            <span className="text-2xl font-semibold text-white font-work">
              App-Mazing
            </span>
          </div>
        </Link>
        <div className="flex gap-2 justify-between items-center text-white lg:order-2">
          <button
            className="flex items-center gap-1 uppercase font-bold bg-primary px-4 py-2 rounded-md text-white"
            onClick={logoutHandler}
            disabled={state?.isLoading}
          >
            <BiLogOut className="sm:mr-2 mr-0 text-lg sm:text-sm" />
            <span className="hidden sm:block">LOG OUT</span>
          </button>
          <Button
            onClick={() => setToggle(!toggle)}
            color="light"
            className=" lg:hidden block"
          >
            <TfiMenu className="text-lg" />
          </Button>
        </div>
        <div
          className={`w-full lg:w-auto lg:flex ${
            toggle ? "flex" : "hidden"
          } flex-col lg:flex-row gap-0 lg:gap-4`}
        >
          <Link
            href="/students"
            className={`font-work ${
              activePage === "students" ? "text-primary" : "text-gray-200"
            } text-lg`}
          >
            <p className="p-2">Students Account</p>
          </Link>

          <Link
            href="/teachers"
            className={`font-work ${
              activePage === "teachers" ? "text-primary" : "text-gray-200"
            } text-lg`}
          >
            <p className="p-2">Teachers Account</p>
          </Link>
          <Link
            href="/settings"
            className={`font-work ${
              activePage === "settings" ? "text-primary" : "text-gray-200"
            } text-lg`}
          >
            <p className="p-2">Settings</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
