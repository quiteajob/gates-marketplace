import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { UpdateHistoryView } from "@/components/dashboard/UpdateHistoryView";
import "../../styles.css";
import "../styles.css";
import "./styles.css";

export default function UpdateHistoryPage() {
  return (
    <main className="dashboardPage">
      <DashboardHeader />
      <UpdateHistoryView />
    </main>
  );
}
