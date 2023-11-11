import React, { useEffect, useState } from "react";
import { CircularLoader, IconErrorFilled24 } from "@dhis2/ui";

import DashboardCollapsibleCard from "../collapsibleCard/collapsibleCard";
import { useFetch } from "../../hooks/useFetch";
import { DASHBOARDS_URL } from "../../constants";

const DashboardSection = () => {
  const [dashboards, setDashboards] = useState([]);
  const [dashboardItemsCache, setDashboardItemsCache] = useState({});
  const [selectedDashboard, setSelectedDashboard] = useState("");

  const { data, loading, error } = useFetch(DASHBOARDS_URL);

  useEffect(() => {
    if (Object.keys(data).length) {
      setDashboards(data["dashboards"]);
    }
  }, [data]);

  useEffect(() => {
    if (dashboards.length) {
      setSelectedDashboard(dashboards[0]["id"]);
    }
  }, [dashboards]);

  const handleExpandCard = (id) => {
    if (id === selectedDashboard) {
      setSelectedDashboard("");
    } else {
      setSelectedDashboard(id);
    }
  };

  if (loading) {
    return (
      <div
        data-testid="dashboards-loader"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem 0",
        }}
      >
        <CircularLoader />
        <p>Loading dashboards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-testid="dashboards-error"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem 0",
        }}
      >
        <IconErrorFilled24 />
        <p>There was an error fetching the dashboards</p>
      </div>
    );
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        padding: "1rem",
      }}
    >
      {dashboards.map((dashboard, i) => (
        <DashboardCollapsibleCard
          key={i}
          dashboardInfo={dashboard}
          expanded={dashboard["id"] === selectedDashboard}
          OnExpandCard={handleExpandCard}
          dashboardItemsCache={dashboardItemsCache}
          setDashboardItemsCache={setDashboardItemsCache}
        />
      ))}
    </section>
  );
};

export default DashboardSection;
