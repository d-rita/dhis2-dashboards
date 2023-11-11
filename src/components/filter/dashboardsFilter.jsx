import React from "react";
import { PropTypes } from "prop-types";
import {
  SingleSelect,
  SingleSelectOption,
} from "@dhis2/ui";
import { DASHBOARDFILTERTYPES } from "../../constants";

const DashboardsFilter = ({
  filter,
  onChangeFilter
}) => {
  return (
    <div
      data-testid="dashboard-type-select-filter"
      style={{
        width: '100%'
      }}
    >
      <SingleSelect
        onChange={onChangeFilter}
        prefix="Filter dashboards by type:"
        selected={filter} 
      >
        {DASHBOARDFILTERTYPES.map((filter, i)=> <SingleSelectOption key={i} label={`${filter.type}`} value={`${filter.type}`} />)}
      </SingleSelect>
    </div>
  );
};

DashboardsFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  OnChangeFilter: PropTypes.func
};

export default DashboardsFilter;
