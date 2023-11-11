import React from "react";
import { PropTypes } from "prop-types";
import { getItemTypeIcon } from "../../utils/getIcons";

function DashboardItemDetail({ itemData }) {
  const { type, id } = itemData;
  const icon = getItemTypeIcon(itemData);
  const text = type === 'VISUALIZATION' ? itemData['visualization']['name'] : type === 'TEXT' ? itemData['text'] : type === 'MAP' ? itemData['map']['name'] : '';

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
        <div data-testid={`${id}-icon`}>{icon}</div>
        <p style={{ marginLeft: '1rem'}} data-testid={`${id}-name`}> 
        {text}
        </p>
          </div>
    
  )
};
}

DashboardItemDetail.propTypes = {
  itemData: PropTypes.object
}

export default DashboardItemDetail ;