/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import DashboardItemDetail from '../cardDetail';
import { columnItemData, mapItemData, textItemData } from './mockData/itemData';

describe('DashboardItemDetail Component', () => {
  test('renders column visualisation dashboard details', () => {
    render(<DashboardItemDetail itemData={columnItemData}/>);
    expect(screen.getByTestId('icon-viz1')).toBeInTheDocument()
    expect(screen.getByTestId('name-viz1')).toBeInTheDocument()
    expect(screen.getByText('Test Column Graph')).toBeInTheDocument();
  });

  test('renders map dashboard details', () => {
    render(<DashboardItemDetail itemData={mapItemData}/>);
    expect(screen.getByTestId('icon-map1')).toBeInTheDocument()
    expect(screen.getByTestId('name-map1')).toBeInTheDocument()
    expect(screen.getByText('Test Map')).toBeInTheDocument();
  });

  test('renders text dashboard details', () => {
    render(<DashboardItemDetail itemData={textItemData}/>);
    expect(screen.getByTestId('icon-text1')).toBeInTheDocument()
    expect(screen.getByTestId('name-text1')).toBeInTheDocument()
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  test('renders no dashboard detail for empty parameter', () => {
    const { container } = render(<DashboardItemDetail itemData={{}}/>);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });
})


