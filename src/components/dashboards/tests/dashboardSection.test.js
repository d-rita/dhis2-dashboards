import { render, screen, fireEvent } from '@testing-library/react';
import DashboardSection from '../dashboardSection';
import { mockedDashboardData } from './mockData/dashboards';

let mock = {data: {}, loading: true, error: null};
jest.mock('../../../hooks/useFetch', () => ({
  useFetch: () => mock
}));

describe('Renders Dashboard Section', () => {
  test('renders dashboard section in loading state', () => {
    render(<DashboardSection />);
    expect(screen.getByTestId('dashboards-loader')).toBeInTheDocument();
    expect(screen.getByText('Loading dashboards...')).toBeInTheDocument();
  });

  test('expands/collapses a dashboard card when clicked', () => {
    mock.data = mockedDashboardData;
    mock.loading = false;
    render(<DashboardSection />);
    // not loadinng
    expect(screen.queryByTestId('dashboards-loader')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading dashboards...')).not.toBeInTheDocument();
    // closed dashboard
    expect(screen.getByText('Test Dashboard 2')).toBeInTheDocument();
    expect(screen.getByTestId('test-dash-2-star-button')).toBeInTheDocument();
    expect(screen.getByTestId('test-dash-2-expand-button')).toBeInTheDocument();
    expect(screen.queryByTestId('test-dash-2-card-body')).not.toBeInTheDocument();
    // expand card
    fireEvent.click(screen.getByTestId('test-dash-2-expand-button'));
    expect(screen.getByTestId('test-dash-2-card-body')).toBeInTheDocument();
  });

  test('renders dashboard section after successful fetch', () => {
    mock.data = mockedDashboardData;
    mock.loading = false;
    render(<DashboardSection />);
    // not loadinng
    expect(screen.queryByTestId('dashboards-loader')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading dashboards...')).not.toBeInTheDocument();
    // expanded dashboard 1
    expect(screen.getByText('Test Dashboard 1')).toBeInTheDocument();
    expect(screen.getByTestId('test-dash-1-star-button')).toBeInTheDocument();
    expect(screen.getByTestId('test-dash-1-expand-button')).toBeInTheDocument();
    expect(screen.getByTestId('test-dash-1-card-body')).toBeInTheDocument();
    // other closed dashboards
    expect(screen.getByText('Test Dashboard 2')).toBeInTheDocument();
    expect(screen.getByTestId('test-dash-2-star-button')).toBeInTheDocument();
    expect(screen.getByTestId('test-dash-2-expand-button')).toBeInTheDocument();
    expect(screen.queryByTestId('test-dash-2-card-body')).not.toBeInTheDocument();
    expect(screen.getByText('Test Dashboard 3')).toBeInTheDocument();
    expect(screen.getByTestId('test-dash-3-star-button')).toBeInTheDocument();
    expect(screen.getByTestId('test-dash-3-expand-button')).toBeInTheDocument();
    expect(screen.queryByTestId('test-dash-3-card-body')).not.toBeInTheDocument();
  });

  test('renders dashboard section error message', () => {
    mock.error = "Error : 404"
    mock.data = {};
    mock.loading = false;
    render(<DashboardSection />);
    expect(screen.queryByTestId('dashboards-loader')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading dashboards...')).not.toBeInTheDocument();
    expect(screen.getByTestId('dashboards-error')).toBeInTheDocument();
    expect(screen.getByText('There was an error fetching the dashboards')).toBeInTheDocument();
  });

  test('dashbaord card can be starred', () => {
    mock.data = mockedDashboardData;
    mock.loading = false;
    mock.error = null;
    render(<DashboardSection />);
    // not loadinng
    expect(screen.queryByTestId('dashboards-loader')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading dashboards...')).not.toBeInTheDocument();
    // closed dashboard
    expect(screen.getByText('Test Dashboard 2')).toBeInTheDocument();
    expect(screen.getByTestId('test-dash-2-star-button')).toBeInTheDocument();
    expect(screen.queryByTestId('test-dash-2-card-body')).not.toBeInTheDocument();
    // star card
    fireEvent.click(screen.getByTestId('test-dash-2-star-button'));
    expect(screen.queryByTestId('test-dash-2-card-body')).not.toBeInTheDocument();
  });
})

