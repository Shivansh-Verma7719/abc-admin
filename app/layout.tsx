import type { Metadata } from "next";
import "./globals.css";
import { SidebarDemo } from "@/components/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { JwtClaims } from "@/types/supabase";
import { PermissionsProvider } from "@/lib/permissions";
import { League_Spartan, Josefin_Sans, Montserrat } from 'next/font/google'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
})
const josefinSans = Josefin_Sans({
  subsets: ['latin'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "ABC Admin",
  description: "ABC Admin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  let user = null;

  if (!data) {
    user = null;
  } else {
    user = data.claims as JwtClaims;
  }

  return (
    <html lang="en">
      <body className={`bg-background text-foreground antialiased ${leagueSpartan.className} ${josefinSans.className} ${montserrat.className}`}>
        <PermissionsProvider>
          <SidebarDemo user={user}>
            {children}
          </SidebarDemo>
        </PermissionsProvider>
      </body>
    </html>
  );
}
