import React, { useEffect, useState } from 'react';
import {
  IconChevronDown24,
  IconChevronUp24,
  IconStar24,
  IconStarFilled24 
} from '@dhis2/ui';
import DashboardItemDetail  from './cardDetail';
import { useFetch } from '../../hooks/useFetch';
import { DASHBOARD_DETAILS_URL } from '../../constants';

export const DASHBOARDITEMTYPES = ['VISUALIZATION', 'MAP', 'TEXT']

const DashboardCollapsibleCard = ({
  dashboardInfo,
  expanded,
  OnExpandCard,
  dashboardItemsCache,
  setDashboardItemsCache
}) => {
  const { displayName, id, starred } = dashboardInfo
  const checkLocalStorage = localStorage.getItem(id)
  const starredDashboard = checkLocalStorage === null ? starred : JSON.parse(localStorage.getItem(id))["starred"]

  const [details, setDetails] = useState({});
  const [starredCard, setStarredCard] = useState(starredDashboard );

  const { error, loading, data } = useFetch(`${DASHBOARD_DETAILS_URL}${id}.json`)

  useEffect(() => {
    if (data) {
      setDetails(data)
      setDashboardItemsCache({ ...dashboardItemsCache, [id]: data })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  const handleStarCardClick = () => {
    setStarredCard(!starredCard)
    const starredDashboard = {
      starred: !starredCard
    }
    localStorage.setItem(id, JSON.stringify(starredDashboard))
  }

  return (
    <div 
      style={{
        width: '100%',
        border: '1px solid #A0ADBA',
        borderRadius: '20px',
        margin: '1rem 0',
        padding: '1.2rem',
        backgroundColor: '#F8F9FA'
      }}
    >
      <div className='cardTitle'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      >
        <h3 onClick={() => OnExpandCard(id)}>{displayName}</h3>
        <div>
          <button
            onClick={handleStarCardClick}
            style={{ 
              border: 'none',
              backgroundColor: 'white' 
            }}
          >
            {starredCard ? <IconStarFilled24 /> : <IconStar24 />}
          </button>
          <button 
            onClick={() => OnExpandCard(id)}
            style={{ 
              border: 'none',
              backgroundColor: 'white' 
            }}
          >
            {expanded? <IconChevronUp24 />: <IconChevronDown24 />}
          </button>
        </div>
      </div>
      {expanded ? 
        (<div 
          className='cardBody'
          style={{
            padding: '0 1rem 1rem'
          }}
        >
          {Object.keys(details).length && details.dashboardItems.length ? (
            details.dashboardItems.map((item, i) => {
              let component = ''
              if (DASHBOARDITEMTYPES.includes(item['type'])) {
                component = <DashboardItemDetail itemData={item} key={i}/>
              }
              return component;
            })
          ): ''}
        </div>) 
      : ''}
    </div>
  )
}

export default DashboardCollapsibleCard;
