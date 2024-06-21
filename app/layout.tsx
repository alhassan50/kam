import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/shared/Header";
import SideBar from "./components/shared/SideBar";
import ReduxProvider from "./redux/ReduxProvider/ReduxProvider";

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
          <Header />
          <div className="flex">
            <SideBar />
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
