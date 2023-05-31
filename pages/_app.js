import "../styles/globals.css";
import React, { useEffect } from "react";
import { AppWrapper } from "../context/AppContext";
import { Toaster, toast } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    toast.dismiss();
  }, []);
  return (
    <>
      <Toaster />
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  );
}

export default MyApp;
