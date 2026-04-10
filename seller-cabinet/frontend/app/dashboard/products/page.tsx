import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProductListView } from "@/components/dashboard/ProductListView";
import "../styles.css";
import "./styles.css";

export default function ProductListPage() {
  return (
    <main className="dashboardPage">
      <DashboardHeader />
      <ProductListView />
    </main>
  );
}
