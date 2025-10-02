import React, { Suspense } from "react";
import SignInPage from "./sign-in-page";

export const metadata = {
  title: "Sign In to Ping Panda",
  description: "Access your Ping Panda account",
};

function Sing() {
  return (
    <Suspense>
      <SignInPage />
    </Suspense>
  );
}

export default Sing;
