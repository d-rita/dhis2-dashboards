import { render, screen, fireEvent } from "@testing-library/react";
import DashboardsFilter from "../dashboardsFilter";

describe("DashboardFilter Component", () => {
  const handleFilter = jest.fn()
  test("renders dashboard filter options after clicking", () => {
    render(
      <DashboardsFilter filter={''} onChangeFilter={handleFilter}/>
    );
    expect(screen.getByTestId("dashboard-type-select-filter")).toBeInTheDocument();
    expect(
      screen.getByText("Filter dashboards by type:"),
    ).toBeInTheDocument();
    const element =  screen.getByText("Filter dashboards by type:");

    expect(
      screen.queryByText("ALL")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("VISUALIZATION")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("MAP")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("TEXT")
    ).not.toBeInTheDocument();
    // click event
    fireEvent.click(element)
    expect(
      screen.getByText("ALL")
    ).toBeInTheDocument();
    expect(
      screen.getByText("VISUALIZATION")
    ).toBeInTheDocument();
    expect(
      screen.getByText("MAP")
    ).toBeInTheDocument();
    expect(
      screen.getByText("TEXT")
    ).toBeInTheDocument();
  });
});
