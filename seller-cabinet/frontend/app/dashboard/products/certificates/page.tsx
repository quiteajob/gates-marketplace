import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CertificatesView } from "@/components/dashboard/CertificatesView";
import "../../styles.css";
import "../styles.css";
import "./styles.css";

export default function CertificatesPage() {
  return (
    <main className="dashboardPage">
      <DashboardHeader />
      <CertificatesView />
    </main>
  );
}
