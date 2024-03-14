import Sidebar from "./_components/sidebar";
import OrganizationSidebar from "./_components/org-sidebar";
import Navbar from "./_components/navbar";
interface Props {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: Props) {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="h-full pl-[80px]">
        <div className="h-full flex gap-x-3 ">
          <OrganizationSidebar />
          <div className="h-full flex-1 bg-slate-200">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
