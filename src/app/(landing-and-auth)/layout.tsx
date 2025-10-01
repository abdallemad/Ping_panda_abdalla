import Navbar from "@/components/nav-bar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default layout;
