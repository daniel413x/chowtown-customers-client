import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Searchbar from "../Searchbar";

test("accepts input", async () => {
  render(
    <MemoryRouter>
      <Searchbar placeholder="Search..." />
    </MemoryRouter>,
  );
  const searchbarInput = screen.getByPlaceholderText("Search...");
  await userEvent.type(searchbarInput, "Arlington");
  expect(searchbarInput).toHaveValue("Arlington");
});

test("renders a red border if there is no input and a search is attempted", async () => {
  render(
    <MemoryRouter>
      <Searchbar placeholder="Search..." />
    </MemoryRouter>,
  );
  const searchbarSubmit = screen.getByTestId("searchbar-submit");
  await userEvent.click(searchbarSubmit);
  const searchbarForm = screen.getByTestId("searchbar-form");
  expect(searchbarForm).toHaveClass("border-red-500");
});

test("takes the user to the search page upon valid submission", async () => {
  render(
    <MemoryRouter>
      <Searchbar placeholder="Search..." />
    </MemoryRouter>,
  );
  const searchbarInput = screen.getByPlaceholderText("Search...");
  await userEvent.type(searchbarInput, "Arlington");
  const searchbarSubmit = screen.getByTestId("searchbar-submit");
  await userEvent.click(searchbarSubmit);
});
