import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import PageControl from "../PageControl";

test("renders three page buttons when there are three pages", async () => {
  render(
    <MemoryRouter>
      <PageControl
        page={1}
        pages={3}
        pageLimitReached={false}
        handleSetPage={() => {}}
      />
    </MemoryRouter>,
  );
  const buttonOne = screen.queryByTestId("pagination-page-button-1");
  const buttonTwo = screen.queryByTestId("pagination-page-button-2");
  const buttonThree = screen.queryByTestId("pagination-page-button-3");
  expect(buttonOne).toBeInTheDocument();
  expect(buttonTwo).toBeInTheDocument();
  expect(buttonThree).toBeInTheDocument();
});

test("does not render a fourth page button when there are three pages", async () => {
  render(
    <MemoryRouter>
      <PageControl
        page={1}
        pages={3}
        pageLimitReached={false}
        handleSetPage={() => {}}
      />
    </MemoryRouter>,
  );
  const buttonFour = screen.queryByTestId("pagination-page-button-4");
  expect(buttonFour).not.toBeInTheDocument();
});

test("cannot navigate one page back when on the first page", async () => {
  render(
    <MemoryRouter>
      <PageControl
        page={1}
        pages={3}
        pageLimitReached={false}
        handleSetPage={() => {}}
      />
    </MemoryRouter>,
  );
  const prevButton = screen.queryByTestId("pagination-prev-button");
  expect(prevButton).toHaveClass("pointer-events-none");
});

test("cannot navigate one page forward when the page limit is reached", async () => {
  render(
    <MemoryRouter>
      <PageControl
        page={3}
        pages={3}
        pageLimitReached
        handleSetPage={() => {}}
      />
    </MemoryRouter>,
  );
  const prevButton = screen.queryByTestId("pagination-next-button");
  expect(prevButton).toHaveClass("pointer-events-none");
});
