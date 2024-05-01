import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

test("renders a login button", () => {
  render((
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ));
  const loginButton = screen.getByTestId("login-button");
  expect(loginButton).toBeDefined();
});
