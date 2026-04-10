import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MergeProductsView } from "@/components/dashboard/MergeProductsView";
import "../../styles.css";
import "../styles.css";
import "./styles.css";

export default function MergeProductsPage() {
  return (
    <main className="dashboardPage">
      <DashboardHeader />
      <MergeProductsView />
    </main>
  );
}
