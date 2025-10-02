import { Suspense } from "react"
import WelcomePage from "./welcome-page"
import { Metadata } from "next"

export const metadata:Metadata = {
  title: "Welcome to Ping Panda",
  description: "Setting up your account...",
  
}


function page() {
  return (
    <Suspense>
      <WelcomePage />
    </Suspense>
  )
}

export default page
