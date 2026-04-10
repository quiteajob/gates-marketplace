import { AddProductsView } from "@/components/dashboard/AddProductsView";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import "../../styles.css";
import "../styles.css";
import "./styles.css";

export default function AddProductsPage() {
  return (
    <main className="dashboardPage dashboardPage-addProducts">
      <DashboardHeader />
      <AddProductsView />
    </main>
  );
}
