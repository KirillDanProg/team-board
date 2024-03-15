import AddOrganizationButton from "./add-org";
import OrganizationsList from "./org-list";

export default function Sidebar() {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-500 h-full w-[80px] flex flex-col gap-y-4 p-4">
      <AddOrganizationButton />
      <OrganizationsList />
    </aside>
  );
}
