import { render, screen } from '@testing-library/react';
import DashboardCollapsibleCard from '../collapsibleCard';
import { mockedSingleDashboardItems, singleDashboardInfo } from './mockData/dashboardData';

let mock = {data: {}, loading: true, error: null};
jest.mock('../../../hooks/useFetch', () => ({
  useFetch: () => mock
}));

describe('DashboardCollapsibleCard Component', () => {
  const handleExpandCard = jest.fn()

  test('renders unexpanded dashboard', () => {
    render(
      <DashboardCollapsibleCard
        dashboardInfo={singleDashboardInfo}
        expanded={false}
        OnExpandCard={handleExpandCard}
        dashboardItemsCache={{}}
        setDashboardItemsCache={() => jest.fn()}
      />);
      expect(screen.getByText('Test Dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-star-button')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-expand-button')).toBeInTheDocument();
      expect(screen.queryByTestId('test-dashboard-1-card-body')).not.toBeInTheDocument();
      expect(screen.queryByTestId('dashboard-items-loader')).not.toBeInTheDocument();
  });

  test('renders loader when dashboard card is expanded and fetch is ongoing', () => {
    render(
      <DashboardCollapsibleCard
        dashboardInfo={singleDashboardInfo}
        expanded={true}
        OnExpandCard={handleExpandCard}
        dashboardItemsCache={{}}
        setDashboardItemsCache={() => jest.fn()}
      />);
      expect(screen.getByText('Test Dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-star-button')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-expand-button')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-card-body')).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-items-loader')).toBeInTheDocument();
  });
  test('renders dashboard items when expanded and fetch is done', () => {
    mock.data = mockedSingleDashboardItems;
    mock.loading = false;
    render(
      <DashboardCollapsibleCard
        dashboardInfo={singleDashboardInfo}
        expanded={true}
        OnExpandCard={handleExpandCard}
        dashboardItemsCache={{}}
        setDashboardItemsCache={() => jest.fn()}
      />);
      expect(screen.getByText('Test Dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-star-button')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-expand-button')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-card-body')).toBeInTheDocument();
      expect(screen.queryByTestId('dashboard-items-loader')).not.toBeInTheDocument();
      // column
      expect(screen.getByTestId('viz1-icon')).toBeInTheDocument()
      expect(screen.getByTestId('viz1-name')).toBeInTheDocument()
      expect(screen.getByText('Test Column Graph')).toBeInTheDocument();
      // map
      expect(screen.getByTestId('map1-icon')).toBeInTheDocument()
      expect(screen.getByTestId('map1-name')).toBeInTheDocument()
      expect(screen.getByText('Test Map')).toBeInTheDocument();
      // text
      expect(screen.getByTestId('text1-icon')).toBeInTheDocument()
      expect(screen.getByTestId('text1-name')).toBeInTheDocument()
      expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  test('displays a message if there are no items to show', () => {
    mock.data = {};
    mock.loading = false;
    render(
      <DashboardCollapsibleCard
        dashboardInfo={singleDashboardInfo}
        expanded={true}
        OnExpandCard={handleExpandCard}
        dashboardItemsCache={{}}
        setDashboardItemsCache={() => jest.fn()}
      />);
      expect(screen.getByText('Test Dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-star-button')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-expand-button')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-card-body')).toBeInTheDocument();
      expect(screen.queryByTestId('dashboard-items-loader')).not.toBeInTheDocument();
      expect(screen.getByText('There are no items to display')).toBeInTheDocument();
  });

  test('displays an error message if fetch fails', () => {
    mock.loading = false;
    mock.error="Error: 404"
    render(
      <DashboardCollapsibleCard
        dashboardInfo={singleDashboardInfo}
        expanded={true}
        OnExpandCard={handleExpandCard}
        dashboardItemsCache={{}}
        setDashboardItemsCache={() => jest.fn()}
      />);
      expect(screen.getByText('Test Dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-star-button')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-expand-button')).toBeInTheDocument();
      expect(screen.getByTestId('test-dashboard-1-card-body')).toBeInTheDocument();
      expect(screen.queryByTestId('dashboard-items-loader')).not.toBeInTheDocument();
      expect(screen.queryByText('There are no items to display')).not.toBeInTheDocument();
      // error
      expect(screen.getByTestId('dashboard-items-error')).toBeInTheDocument();
      expect(screen.getByText('There was an error fetching the dashboard items')).toBeInTheDocument();
  });
 
})


