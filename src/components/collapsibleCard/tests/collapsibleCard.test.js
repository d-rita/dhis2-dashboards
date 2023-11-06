import { render, screen } from '@testing-library/react';
import { columnItemData, mapItemData, textItemData } from './mockData/itemData';
import DashboardCollapsibleCard from '../collapsibleCard';
import { singleDashboardInfo } from './mockData/dashboardData';
import { useFetch } from '../../../hooks/useFetch';

let mock = {data: {}, loading: true, error: null};
jest.mock('../../../hooks/useFetch', () => ({
  useFetch: () => mock
}));

describe('DashboardItemDetail Component', () => {
  const handleExpandCard = jest.fn()

  test('renders dashboard details', () => {
    render(
      <DashboardCollapsibleCard
        dashboardInfo={singleDashboardInfo}
        expanded={false}
        OnExpandCard={handleExpandCard}
        dashboardItemsCache={{}}
        setDashboardItemsCache={() => jest.fn()}
      />);
      expect(screen.getByText('Test Dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('star-button-test-dashboard-1')).toBeInTheDocument();
      expect(screen.getByTestId('expand-button-test-dashboard-1')).toBeInTheDocument();
  });

 
})


