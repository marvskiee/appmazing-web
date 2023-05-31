import React, { useState } from "react";
import { Modal, TextInput, Label, Button } from "flowbite-react";
import { FaCogs, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { toastOptions } from "../../styles/modalOptions";
import { changePassword } from "../../services/user.services";
import { useAppContext } from "../../context/AppContext";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export const AvatarModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state, dispatch } = useAppContext();
  // show passwords state
  const [currentVisible, setCurrentVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const updateHandler = async (e) => {
    e.preventDefault();
    const newData = {
      oldPassword: currentPassword,
      newPassword,
      confirmPassword,
    };

    toast.dismiss();
    const { success, data, errors } = await changePassword(
      newData,
      state?.user?._id
    );
    if (
      currentPassword.trim().length == 0 ||
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
      setIsOpen(false);
      clearForm();
    }
  };
  const clearForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <>
      <FaUserCircle
        className="cursor-pointer"
        size={40}
        onClick={() => setIsOpen(true)}
      />
      <Modal
        show={isOpen}
        size="lg"
        popup={true}
        onClose={() => {
          setIsOpen(false);
          clearForm();
        }}
        className="font-work min-h-screen"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-2xl text-primary dark:text-white text-center font-bold uppercase">
              Update Password
            </h3>
            <form className="space-y-4" onSubmit={updateHandler}>
              <div>
                <div className="block">
                  <Label htmlFor="currentpassword" value="Current Password" />
                </div>
                <div className="relative">
                  <TextInput
                    id="currentpassword"
                    type={!currentVisible ? "password" : "text"}
                    icon={RiLockPasswordFill}
                    required={true}
                    value={currentPassword}
                    placeholder="Current Password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
                <div className="block">
                  <Label htmlFor="newPassword" value="New Password" />
                </div>
                <div className="relative">
                  <TextInput
                    id="newPassword"
                    type={!newVisible ? "password" : "text"}
                    icon={RiLockPasswordFill}
                    required={true}
                    value={newPassword}
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
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
                <div className="block">
                  <Label htmlFor="confirmPassword" value="Confirm Password" />
                </div>
                <div className="relative">
                  <TextInput
                    id="confirmPassword"
                    type={!confirmVisible ? "password" : "text"}
                    icon={RiLockPasswordFill}
                    required={true}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
              <div className="w-full">
                <Button type="submit" className="w-full">
                  UPDATE ACCOUNT
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
