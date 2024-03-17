import Sidebar from "./_components/sidebar";
import OrganizationSidebar from "./_components/org-sidebar";
import Navbar from "./_components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Working dashboard",
};

interface Props {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: Props) {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="h-full pl-[60px]">
        <div className="h-full flex gap-x-3 ">
          <OrganizationSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
