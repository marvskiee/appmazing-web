import { Card, TextInput, Label, Button } from "flowbite-react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { toastOptions } from "../styles/modalOptions";
import { changePassword } from "../services/user.services";
import { useAppContext } from "../context/AppContext";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { LoggedInNavbar } from "../components";

const Settings = () => {
  const { state, dispatch } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // show passwords state
  const [currentVisible, setCurrentVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const confirmHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    toast.dismiss();
    const { success, data, errors } = await changePassword(
      newData,
      state?.user?._id
    );
    if (
      oldPassword.trim().length == 0 ||
      newPassword.trim().length == 0 ||
      confirmPassword.trim().length == 0
    ) {
      toast.error("Please fill up the form!", toastOptions);
    } else if (newPassword != confirmPassword) {
      toast.error("Confirm password mismatch!", toastOptions);
    } else if (errors?.oldPasswordError) {
      toast.error(errors?.oldPasswordError, toastOptions);
    }
    if (success) {
      toast.success("Change password successfully!", toastOptions);
      clearForm();
    }
    setIsLoading(false);
  };
  const clearForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className=" font-work">
      <Toaster />
      <LoggedInNavbar activePage={"settings"} />
      <div className="p-5 flex flex-col gap-5">
        <div className=" flex items-center justify-center">
          <form onSubmit={confirmHandler}>
            <Card className="w-full sm:w-[29rem]">
              <h1 className="text-xl text-primary font-bold">
                Change Password
              </h1>
              <div className="">
                <div className="mb-2 block">
                  <Label
                    htmlFor="oldpassword"
                    value="Current Password"
                    className="font-work"
                  />
                </div>
                <div className="relative">
                  <TextInput
                    id="oldpassword"
                    type={!currentVisible ? "password" : "text"}
                    disabled={isLoading}
                    icon={RiLockPasswordFill}
                    placeholder="Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required={true}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[.85rem]"
                    onClick={() => setCurrentVisible(!currentVisible)}
                  >
                    {!currentVisible ? (
                      <BsFillEyeSlashFill className="bg-gray" />
                    ) : (
                      <BsFillEyeFill className="bg-gray" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="newpassword"
                    value="New Password"
                    className="font-work"
                  />
                </div>
                <div className="relative">
                  <TextInput
                    id="newpassword"
                    type={!newVisible ? "password" : "text"}
                    value={newPassword}
                    disabled={isLoading}
                    icon={RiLockPasswordFill}
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required={true}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[.85rem]"
                    onClick={() => setNewVisible(!newVisible)}
                  >
                    {!newVisible ? (
                      <BsFillEyeSlashFill className="bg-gray" />
                    ) : (
                      <BsFillEyeFill className="bg-gray" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="retypepassword"
                    value="Confirm Password"
                    className="font-work"
                  />
                </div>
                <div className="relative">
                  <TextInput
                    id="retypepassword"
                    type={!confirmVisible ? "password" : "text"}
                    disabled={isLoading}
                    value={confirmPassword}
                    icon={RiLockPasswordFill}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={true}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[.85rem]"
                    onClick={() => setConfirmVisible(!confirmVisible)}
                  >
                    {!confirmVisible ? (
                      <BsFillEyeSlashFill className="bg-gray" />
                    ) : (
                      <BsFillEyeFill className="bg-gray" />
                    )}
                  </button>
                </div>
              </div>

              <button
                className="bg-primary px-4 py-2 rounded-md text-white font-semibold"
                type="submit"
                disabled={isLoading}
              >
                Confirm
              </button>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
