import React, { Children } from "react";

const Modal = ({ children }) => {
  return (
    <div className="bg-black/50 w-full p-4 overflow-auto h-screen fixed top-0 left-0 z-20 flex items-center justify-center">
      <div className="m-auto max-w-[40rem]">{children}</div>
    </div>
  );
};

export default Modal;
