import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/shared/Header";
import SideBar from "./components/shared/SideBar";
import ReduxProvider from "./redux/ReduxProvider/ReduxProvider";
import EmptySideBar from "./components/shared/EmptySideBar";
import LogIn from "./components/shared/LogIn";
import SignUp from "./components/shared/SignUp";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] // Specify the available weights here
});

export const metadata: Metadata = {
  title: {
    default: "KAM",
    template: "%s | KAM",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
         {/*  <LogIn />
          <SignUp /> */}
          <Header />
          <div className="flex flex-col md:flex-row overflow-x-hidden h-full overflow-y-hidden">
            <SideBar />
            <EmptySideBar />
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
