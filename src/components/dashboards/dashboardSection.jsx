import React, { useEffect, useState } from 'react';
import DashboardCollapsibleCard  from '../collapsibleCard/collapsibleCard';
import { useFetch } from '../../hooks/useFetch';
import { DASHBOARDS_URL } from '../../constants';

const DashboardSection = () => {
  const [dashboards, setDashboards] = useState([])
  const [dashboardItemsCache, setDashboardItemsCache] = useState({})
  const [selectedDashboard, setSelectedDashboard] = useState('')

  const { data } = useFetch(DASHBOARDS_URL)

  useEffect(() => {
    if(Object.keys(data).length) {
      setDashboards(data['dashboards'])
    }
  }, [data])

  useEffect(() => {
    if(dashboards.length) {
      setSelectedDashboard(dashboards[0]['id'])
    }
  }, [dashboards])

  const handleExpandCard = (id) => {
    if(id === selectedDashboard){
      setSelectedDashboard('')
    } else {
      setSelectedDashboard(id)
    } 
  }

  return (
    <section 
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        padding: '1rem'
      }}
    >
     {dashboards.map((dashboard, i) => (
      <DashboardCollapsibleCard  
        key={i}
        dashboardInfo={{...dashboard}} 
        expanded={dashboard['id'] === selectedDashboard}
        OnExpandCard={handleExpandCard}
        dashboardItemsCache={dashboardItemsCache}
        setDashboardItemsCache={setDashboardItemsCache}
      />)
    )}
    </section>
  )
}

export default DashboardSection;