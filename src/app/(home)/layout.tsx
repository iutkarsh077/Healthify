import Navbar from "@/components/Navbar/Navbar";
import StreamVideoProvider from "@/providers/StreamClientProviders";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <StreamVideoProvider>
        <Navbar />
        {children}
      </StreamVideoProvider>
    </div>
  );
};

export default RootLayout;
