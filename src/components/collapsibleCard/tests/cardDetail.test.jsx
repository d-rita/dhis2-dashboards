/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import DashboardItemDetail from "../cardDetail";
import { columnItemData, mapItemData, textItemData } from "./mockData/itemData";

describe("DashboardItemDetail Component", () => {
  test("renders column visualisation dashboard details", () => {
    render(<DashboardItemDetail itemData={columnItemData} />);
    expect(screen.getByTestId("viz1-icon")).toBeInTheDocument();
    expect(screen.getByTestId("viz1-name")).toBeInTheDocument();
    expect(screen.getByText("Test Column Graph")).toBeInTheDocument();
  });

  test("renders map dashboard details", () => {
    render(<DashboardItemDetail itemData={mapItemData} />);
    expect(screen.getByTestId("map1-icon")).toBeInTheDocument();
    expect(screen.getByTestId("map1-name")).toBeInTheDocument();
    expect(screen.getByText("Test Map")).toBeInTheDocument();
  });

  test("renders text dashboard details", () => {
    render(<DashboardItemDetail itemData={textItemData} />);
    expect(screen.getByTestId("text1-icon")).toBeInTheDocument();
    expect(screen.getByTestId("text1-name")).toBeInTheDocument();
    expect(screen.getByText("Test Text")).toBeInTheDocument();
  });

  test("renders no dashboard detail for empty parameter", () => {
    const { container } = render(<DashboardItemDetail itemData={{}} />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });
});
