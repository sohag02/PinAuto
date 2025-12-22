import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";

const titles: Record<string, string> = {
  dashboard: "Dashboard",
  products: "Products",
  pinterest: "Pinterest Automation",
  analytics: "Analytics",
  settings: "Settings",
};

export default function DashboardLayoutWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.pathname.split("/")[2] || "dashboard";

  return (
    <DashboardLayout
      title={titles[activeTab] ?? "Dashboard"}
      activeTab={activeTab}
      onTabChange={(tab) =>
        navigate(tab === "dashboard" ? "/dashboard" : `/dashboard/${tab}`)
      }
    >
      <Outlet />
    </DashboardLayout>
  );
}
