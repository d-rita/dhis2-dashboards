import { render, screen } from "@testing-library/react";
import Header from "../header";

test("renders header", () => {
  render(<Header />);
  const element = screen.getByText(/DHIS2 User Dashboards/i);
  expect(element).toBeInTheDocument();
});
