"use client";

import Footer from "@/components/Footer";
import "./globals.scss";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";

const inter = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [sidebar, _sidebar] = useState(null);

  useEffect(() => {
    document.querySelector("body").style.overflow = sidebar ? "hidden" : "auto";
  }, [sidebar]);

  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="We design the best stationery and carry a curated collection of housewares, apparel, and accessories. Free shipping over $50."
        />
        <title>Poketo | Art & Design For Your Every Day</title>
      </head>
      <body className={inter.className}>
        <div className={`wrapper ${sidebar ? "active" : ""}`}>
          <Header {...{ sidebar, _sidebar }} />
          {children}
          <Footer />
        </div>
        <SideBar {...{ sidebar, _sidebar }} />
      </body>
    </html>
  );
}
