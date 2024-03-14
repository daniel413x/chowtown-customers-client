import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

test("renders a layout", () => {
  render(<App />);
  const layout = screen.getByTestId("layout");
  expect(layout).toBeDefined();
});
