import React from "react";
import { PropTypes } from "prop-types";
import { getItemTypeIcon } from "../../utils/getIcons";

function DashboardItemDetail({ itemData }) {
  const { type, id } = itemData;
  const icon = getItemTypeIcon(itemData);

  if (type) {
    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          borderBottom: '1px solid grey'
        }}
      >
        <p data-testid={`${id}-icon`}>{icon}</p>      
        <p style={{ marginLeft: '1rem'}} data-testid={`${id}-name`}>
          {type === 'VISUALIZATION' ? itemData['visualization']['name'] : ''}
          {type === 'TEXT' ? itemData['text'] : ''}
          {type === 'MAP' ? itemData['map']['name'] : ''}
        </p>
      </div>
    )
  }
}

DashboardItemDetail.propTypes = {
  itemData: PropTypes.object
}

export default DashboardItemDetail ;