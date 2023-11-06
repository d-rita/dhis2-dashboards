import { render, screen } from '@testing-library/react';
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
})

