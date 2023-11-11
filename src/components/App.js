import DashboardSection from "./dashboards/dashboardSection";
import Footer from "./header/footer";
import Header from "./header/header";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#F3F5F7",
        height: "auto",
      }}
    >
      <Header />
      <DashboardSection />
      <Footer />
    </div>
  );
}

export default App;
