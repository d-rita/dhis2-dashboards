import React from "react";
import { getItemTypeIcon } from "../../utils/getIcons";

function DashboardItemDetail({ itemData }) {
  const { type } = itemData;
  const icon = getItemTypeIcon(itemData);

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
      <p>{icon}</p>      
      <p style={{ marginLeft: '1rem'}}>
        {type === 'VISUALIZATION' ? itemData['visualization']['name'] : ''}
        {type === 'TEXT' ? itemData['text'] : ''}
        {type === 'MAP' ? itemData['map']['name'] : ''}
      </p>
    </div>
  )
}

export default DashboardItemDetail ;