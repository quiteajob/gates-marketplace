import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OrdersChartCard } from "@/components/dashboard/OrdersChartCard";
import { StatsAndCommunications } from "@/components/dashboard/StatsAndCommunications";
import "./styles.css";

export default function DashboardPage() {
  return (
    <main className="dashboardPage">
      <DashboardHeader />
      <OrdersChartCard />
      <StatsAndCommunications />
    </main>
  );
}
