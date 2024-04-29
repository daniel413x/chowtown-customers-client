import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";
import { MemoryRouter } from "react-router-dom";

test("renders a login button", () => {
  render((
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ));
  const loginButton = screen.getByTestId("login-button");
  expect(loginButton).toBeDefined();
});
