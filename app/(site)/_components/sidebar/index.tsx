import AddOrganizationButton from "./add-org";
import OrganizationsList from "./org-list";

export default function Sidebar() {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex flex-col gap-y-4 p-4">
      <AddOrganizationButton />
      <OrganizationsList />
    </aside>
  );
}
