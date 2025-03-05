import "../index.css";

import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Doctor Appointment Display",
  description:
    "A React app for visualizing daily appointments per doctor from JSON data.",
  icons: "stethoscope.png",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
