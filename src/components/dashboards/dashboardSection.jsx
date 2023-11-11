import React, { useEffect, useState } from "react";
import { CircularLoader, IconErrorFilled24 } from "@dhis2/ui";
import DashboardCollapsibleCard from "../collapsibleCard/collapsibleCard";
import { useFetch } from "../../hooks/useFetch";
import { DASHBOARDS_URL } from "../../constants";
import DashboardsFilter from "../filter/dashboardsFilter";

const DashboardSection = () => {
  const [dashboards, setDashboards] = useState([]);
  const [selectedDashboard, setSelectedDashboard] = useState("");
  const [filter, setFilter] = useState("ALL");

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

  const handleFilter = (event) => {
    setFilter(event.selected)
  }

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
      <DashboardsFilter filter={filter} onChangeFilter={handleFilter}/>
      {dashboards.map((dashboard, i) => (
        <DashboardCollapsibleCard
          key={i}
          filter={filter}
          dashboardInfo={dashboard}
          expanded={dashboard["id"] === selectedDashboard}
          OnExpandCard={handleExpandCard}
        />
      ))}
    </section>
  );
};

export default DashboardSection;
