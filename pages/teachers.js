import React, { useState, useEffect, useRef } from "react";
import { LoggedInNavbar, Modal } from "../components";
import {
  Tabs,
  Dropdown,
  Select,
  TextInput,
  Table,
  Button,
} from "flowbite-react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import {
  changePassword,
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "../services/user.services";
import { FaSearch } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { BiReset, BiTrash } from "react-icons/bi";
import moment from "moment";
const Students = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(null);
  const targetRef = useRef();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const genderRef = useRef();
  const idNumberRef = useRef();
  const birthdayRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const load = async () => {
    const { success, data } = await getAllUser(1);
    if (success) setData(data);
  };

  const tableHeaders = [
    "#",
    "ID Number",
    "Name",
    "Birth Date",
    "Gender",
    "Action",
  ];
  const [search, setSearch] = useState("");
  const filteredSearch = data.filter(
    (d) =>
      d.first_name.toLowerCase().includes(search.toLowerCase()) ||
      d.last_name.toLowerCase().includes(search.toLowerCase()) ||
      d.gender.toLowerCase().includes(search.toLowerCase()) ||
      d.id_number.toLowerCase().includes(search.toLowerCase())
  );
  const SectionTable = (data) => {
    return (
      <>
        <div className="flex xs:items-center items-start justify-between gap-4 mb-4 flex-col sm:flex-row">
          <TextInput
            id="search"
            type="text"
            icon={FaSearch}
            placeholder="Search for anything"
            onChange={(e) => setSearch(e.target.value)}
            required={true}
            value={search}
            className="font-work w-full text-sm"
          />
          <button
            onClick={() => {
              targetRef.current = null;
              setModal("add");
            }}
            className="shrink-0 bg-primary px-4 py-2 rounded-md text-white font-semibold"
          >
            Add Teacher
          </button>
        </div>

        <Table striped={true} className="font-work">
          <Table.Head className="text-center bg-cstmgray text-white">
            {tableHeaders.map((header, index) => (
              <Table.HeadCell colspan={header == "Action" ? 3 : 1} key={index}>
                {header}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {data.length > 0 ? (
              data?.map((item, index) => (
                <Table.Row key={index} className="text-center">
                  <Table.Cell className="text-primary font-bold">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="text-black">
                    {item.id_number}
                  </Table.Cell>
                  <Table.Cell className="text-black capitalize">
                    {item.first_name + " " + item.last_name}
                  </Table.Cell>
                  <Table.Cell className="text-black">
                    {item?.birthday}
                  </Table.Cell>
                  <Table.Cell className="text-black">{item.gender}</Table.Cell>
                  <Table.Cell className="">
                    <button
                      onClick={(e) => {
                        targetRef.current = item;
                        setModal("edit");
                      }}
                      className="flex gap-1 mx-auto uppercase items-center bg-emerald-500 px-4 py-2 rounded-md text-white font-semibold"
                    >
                      <AiOutlineEdit className="mr-1" />
                      Edit
                    </button>
                  </Table.Cell>
                  <Table.Cell className="">
                    <button
                      onClick={(e) => {
                        targetRef.current = item;
                        setModal("delete");
                      }}
                      className="flex gap-1 mx-auto uppercase items-center bg-red-500 px-4 py-2 rounded-md text-white font-semibold"
                    >
                      <BiTrash className="mr-1" />
                      Delete
                    </button>
                  </Table.Cell>
                  <Table.Cell className="">
                    <button
                      onClick={(e) => {
                        targetRef.current = item;
                        setModal("reset");
                      }}
                      className="flex gap-1 mx-auto uppercase items-center bg-blue-500 px-4 py-2 rounded-md text-white font-semibold"
                    >
                      <BiReset className="mr-1" />
                      Reset Password
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-2 text-center">
                  No data
                </td>
              </tr>
            )}
          </Table.Body>
        </Table>
      </>
    );
  };

  const addHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    toast.dismiss();
    const newData = {
      first_name: firstNameRef.current?.value.toLowerCase(),
      last_name: lastNameRef.current?.value.toLowerCase(),
      gender: genderRef.current?.value,
      birthday: birthdayRef.current?.value,
      role: 1,
      password:
        lastNameRef.current?.value.toLowerCase() +
        moment(birthdayRef.current?.value).format("MMDDYY"),
      id_number: idNumberRef.current?.value,
    };
    const res = await createUser(newData);
    if (res.success) {
      toast.success("User Added successfully!");
      setData([...data, res.data]);
      setModal(null);
    } else if (res.error?.idNumberError) {
      toast.error(res.error?.idNumberError);
    } else {
      toast.error("Something went wrong!");
    }
    setIsLoading(false);
  };

  const updateHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    toast.dismiss();
    const newData = {
      first_name: firstNameRef.current?.value.toLowerCase(),
      last_name: lastNameRef.current?.value.toLowerCase(),
      gender: genderRef.current?.value,
      birthday: birthdayRef.current?.value,
      id_number: idNumberRef.current?.value,
    };

    const res = await updateUser(newData, targetRef.current._id);
    if (res.success) {
      toast.success("User Updated successfully!");
      load();
      setModal(null);
    } else if (res.error?.idNumberError) {
      toast.error(res.error?.idNumberError);
    } else {
      toast.error("Something went wrong!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <LoggedInNavbar activePage="teachers" />
      <div className="p-5 flex flex-col gap-5">
        <div className="mx-auto max-w-[80rem] w-full">
          <p className="font-bold text-2xl text-primary font-work mb-4">
            Teachers Account
          </p>
          {SectionTable(filteredSearch)}
        </div>
      </div>
      {(modal == "edit" || modal == "add") &&
        AddEditModal({
          setModal,
          modal,
          isLoading,
          refHooks: {
            firstNameRef,
            lastNameRef,
            genderRef,
            birthdayRef,
            idNumberRef,
          },
          data: targetRef?.current,
          submitHandler: modal == "add" ? addHandler : updateHandler,
        })}
      {modal == "delete" &&
        DeleteModal({
          data,
          setModal,
          modal,
          user_data: targetRef?.current,
          setData,
        })}
      {modal == "reset" &&
        ResetModal({
          data,
          setModal,
          modal,
          user_data: targetRef?.current,
          setData,
        })}
    </>
  );
};

export default Students;

const AddEditModal = ({
  setModal,
  isLoading,
  modal,
  data,
  refHooks,
  submitHandler,
}) => {
  const { firstNameRef, lastNameRef, birthdayRef, genderRef, idNumberRef } =
    refHooks;
  const grade_level = ["kinder", 1, 2, 3, 4, 5, 6];
  return (
    <Modal>
      <div
        key={modal}
        className="bg-white rounded-md p-8 max-w-[30rem] w-screen flex flex-col"
      >
        <div className="flex items-center justify-between">
          <p className="py-2 font-bold text-2xl font-work text-primary">
            {modal == "edit" ? "Edit" : "Add"} Teacher
          </p>
          <AiOutlineClose
            color=""
            className="mr-2 text-xl cursor-pointer"
            onClick={() => {
              setModal(null);
            }}
          />
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-2">
          <div>
            <label className="inline-block py-2">ID Number:</label>
            <input
              required
              type="text"
              ref={idNumberRef}
              defaultValue={data?.id_number}
              placeholder="ID Number"
              className="-outline-offset-1 p-2 px-4 rounded-md  bg-gray-100 w-full "
            />
          </div>
          <div>
            <label className="inline-block py-2">First Name:</label>
            <input
              required
              type="text"
              ref={firstNameRef}
              placeholder="First Name"
              defaultValue={data?.first_name}
              className="-outline-offset-1 p-2 px-4 rounded-md  bg-gray-100 w-full "
            />
          </div>
          <div>
            <label className="inline-block py-2">Last Name:</label>
            <input
              required
              type="text"
              ref={lastNameRef}
              placeholder="First Name"
              defaultValue={data?.last_name}
              className="-outline-offset-1 p-2 px-4 rounded-md  bg-gray-100 w-full "
            />
          </div>
          <div>
            <label className="inline-block py-2">Birthday:</label>
            <input
              required
              type="date"
              ref={birthdayRef}
              defaultValue={data?.birthday}
              className="-outline-offset-1 p-2 px-4 rounded-md  bg-gray-100 w-full "
            />
          </div>
          <div>
            <label className="inline-block py-2">Gender:</label>
            <select
              ref={genderRef}
              defaultValue={data?.gender}
              className="-outline-offset-1 p-2 px-4 rounded-md  bg-gray-100 w-full "
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary px-4 py-2 rounded-md text-white font-semibold"
          >
            {!isLoading ? "Submit" : "Submitting..."}
          </button>
        </form>
      </div>
    </Modal>
  );
};

const DeleteModal = ({ setModal, setData, data, user_data }) => {
  const deleteHandler = async () => {
    setModal(null);
    if (user_data.role == 0) {
      const pre_res = await getAllUserByRole(0);
      if (pre_res.success && pre_res?.data.length == 1) {
        toastHandler("user_deleted_400");
        return;
      }
    }
    const res = await deleteUser(user_data?._id);
    if (res.success) {
      toast.success("User Deleted Successfully!");
      setData(data.filter((d) => d._id != user_data._id));
    } else toast.error("Something went wrong!");
  };
  return (
    <Modal>
      <div className="bg-white rounded-md p-4 max-w-[30rem] flex gap-4 flex-col">
        <div className="flex items-center justify-between flex-col  gap-2">
          <p className="p-2 font-semibold text-lg text-center">
            Are you sure you want to delete this user?
          </p>
          <div className="flex justify-end w-full gap-2">
            <button
              onClick={deleteHandler}
              className=" px-4 py-2 rounded-md bg-red-500 text-white font-semibold"
            >
              Confirm
            </button>
            <button
              onClick={() => setModal(null)}
              className=" px-4 py-2 rounded-md bg-gray-200  font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const ResetModal = ({ setModal, setData, data, user_data }) => {
  const resetHandler = async () => {
    setModal(null);
    const res = await changePassword(user_data);
    if (res.success) {
      toast.success("Password Reset Successfully!");
    } else toast.error("Something went wrong!");
  };
  return (
    <Modal>
      <div className="bg-white rounded-md p-4 max-w-[30rem] flex gap-4 flex-col">
        <div className="flex items-center justify-between flex-col  gap-2">
          <p className="p-2 font-semibold text-lg text-center">
            Are you sure you want to reset password of "{user_data?.first_name}{" "}
            {user_data?.last_name}"?
          </p>
          <div className="flex justify-end w-full gap-2">
            <button
              onClick={resetHandler}
              className=" px-4 py-2 rounded-md bg-blue-500 text-white font-semibold"
            >
              Confirm
            </button>
            <button
              onClick={() => setModal(null)}
              className=" px-4 py-2 rounded-md bg-gray-200  font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
