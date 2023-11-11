import React, { useCallback, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import {
  IconChevronDown24,
  IconChevronUp24,
  IconStar24,
  IconStarFilled24,
  CircularLoader,
  IconErrorFilled24,
  Tooltip
} from "@dhis2/ui";
import DashboardItemDetail from "./cardDetail";
import { useFetch } from "../../hooks/useFetch";
import { DASHBOARD_DETAILS_URL } from "../../constants";

export const DASHBOARDITEMTYPES = ["VISUALIZATION", "MAP", "TEXT"];

const DashboardCollapsibleCard = ({
  dashboardInfo,
  filter,
  expanded,
  OnExpandCard,
}) => {
  const { displayName, id, starred } = dashboardInfo;
  const checkLocalStorage = localStorage.getItem(id);
  const starredDashboard =
    checkLocalStorage === null
      ? starred
      : JSON.parse(localStorage.getItem(id))["starred"];
  const border = expanded ? "2px solid #42a5f5" : "1px solid #A0ADBA";

  const [dashboardItems, setDashboardItems] = useState([]);
  const [starredCard, setStarredCard] = useState(starredDashboard);

  const { data, loading, error } = useFetch(
    `${DASHBOARD_DETAILS_URL}${id}.json`,
  );

  const filterDashboardItems = useCallback((obj) => {
    if (obj['dashboardItems']){
      let filtered = (filter === 'ALL' || filter === '') ? obj['dashboardItems'] : 
      obj['dashboardItems'].filter((item) => item['type'] === filter);
      return filtered;
    }
  }, [filter])

  useEffect(() => {
    if (data) {
      setDashboardItems(filterDashboardItems(data))
    }
  }, [data, filterDashboardItems, id]);
  
  const handleStarCardClick = () => {
    setStarredCard(!starredCard);
    const starredDashboard = {
      starred: !starredCard,
    };
    localStorage.setItem(id, JSON.stringify(starredDashboard));
  };

  return (
    <div
      style={{
        width: "100%",
        border: `${border}`,
        borderRadius: "20px",
        margin: "1rem 0",
        padding: "1.2rem",
        backgroundColor: "white",
        cursor: 'pointer'
      }}
    >
      <div
        className="cardTitle"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 onClick={() => OnExpandCard(id)}>{displayName}</h3>
        <div>
          <button
            onClick={handleStarCardClick}
            data-testid={`${id}-star-button`}
            style={{
              border: "none",
              backgroundColor: "white",
            }}
          >
            <Tooltip 
              content={starredCard? "Unstar": "Star"} 
              placement="bottom"
            >
              {starredCard ? <IconStarFilled24 /> : <IconStar24 />}
            </Tooltip>
            
          </button>
          <button
            onClick={() => OnExpandCard(id)}
            data-testid={`${id}-expand-button`}
            style={{
              border: "none",
              backgroundColor: "white",
            }}
          >
            <Tooltip 
              content={expanded ? "Collapse": "Expand"} 
              placement="bottom"
            >
              {expanded ? <IconChevronUp24 /> : <IconChevronDown24 />}
            </Tooltip>
          </button>
        </div>
      </div>
      {expanded ? (
        <div
          data-testid={`${id}-card-body`}
          style={{
            padding: "0 1rem 1rem",
          }}
        >
          {loading ? (
            <div
              data-testid="dashboard-items-loader"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem 0",
              }}
            >
              <CircularLoader extrasmall />
              <p>Loading dashboard items...</p>
            </div>
          ) : (
            ""
          )}
          {error ? (
            <div
              data-testid="dashboard-items-error"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem 0",
              }}
            >
              <IconErrorFilled24 />
              <p>There was an error fetching the dashboard items</p>
            </div>
          ) : (
            ""
          )}
          {dashboardItems?.length ? (
            dashboardItems.map((item, i) => {
              let component = "";
              if (DASHBOARDITEMTYPES.includes(item["type"])) {
                component = <DashboardItemDetail itemData={item} key={i} />;
              }
              return component;
            })
          ) : !error && !loading ? (
            <p>There are no items to display</p>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

DashboardCollapsibleCard.propTypes = {
  dashboardInfo: PropTypes.shape({
    displayName: PropTypes.string,
    id: PropTypes.string,
    starred: PropTypes.bool,
  }),
  expanded: PropTypes.bool,
  OnExpandCard: PropTypes.func
};

export default DashboardCollapsibleCard;
