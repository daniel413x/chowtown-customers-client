import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import QueryClientProviderWrapper from "@/components/providers/QueryClientProvider";
import userEvent from "@testing-library/user-event";
import CuisinesFilter from "../CuisinesFilter";

describe("CuisinesFilter", () => {
  it("checks a filter upon clicking it", async () => {
    render(
      <QueryClientProviderWrapper>
        <MemoryRouter>
          <CuisinesFilter handleSetSearchParams={() => {}} />
        </MemoryRouter>
      </QueryClientProviderWrapper>,
    );
    const cuisineCheckbox = screen.getByTestId("cuisine-checkbox-breakfast");
    expect(cuisineCheckbox).toHaveClass("border-orange-400");
    await userEvent.click(cuisineCheckbox);
    expect(cuisineCheckbox).toHaveClass("border-green-600");
  });

  it("checks multiple filters upon clicking them", async () => {
    render(
      <QueryClientProviderWrapper>
        <MemoryRouter>
          <CuisinesFilter handleSetSearchParams={() => {}} />
        </MemoryRouter>
      </QueryClientProviderWrapper>,
    );
    const cuisineCheckboxOne = screen.getByTestId("cuisine-checkbox-breakfast");
    expect(cuisineCheckboxOne).toHaveClass("border-orange-400");
    await userEvent.click(cuisineCheckboxOne);
    expect(cuisineCheckboxOne).toHaveClass("border-green-600");
    const cuisineCheckboxTwo = screen.getByTestId("cuisine-checkbox-bbq");
    expect(cuisineCheckboxTwo).toHaveClass("border-orange-400");
    await userEvent.click(cuisineCheckboxTwo);
    expect(cuisineCheckboxTwo).toHaveClass("border-green-600");
    expect(cuisineCheckboxOne).toHaveClass("border-green-600");
  });

  it("prechecks a filter that is in the initial query params", async () => {
    render(
      <QueryClientProviderWrapper>
        <MemoryRouter initialEntries={["/?cuisines=American"]}>
          <CuisinesFilter handleSetSearchParams={() => {}} />
        </MemoryRouter>
      </QueryClientProviderWrapper>,
    );
    const cuisineCheckboxOne = screen.getByTestId("cuisine-checkbox-american");
    expect(cuisineCheckboxOne).toHaveClass("border-green-600");
  });

  it("unchecks filters upon clicking them", async () => {
    render(
      <QueryClientProviderWrapper>
        <MemoryRouter initialEntries={["/?cuisines=Breakfast,BBQ"]}>
          <CuisinesFilter handleSetSearchParams={() => {}} />
        </MemoryRouter>
      </QueryClientProviderWrapper>,
    );
    const cuisineCheckboxOne = screen.getByTestId("cuisine-checkbox-breakfast");
    expect(cuisineCheckboxOne).toHaveClass("border-green-600");
    await userEvent.click(cuisineCheckboxOne);
    expect(cuisineCheckboxOne).toHaveClass("border-orange-400");
    const cuisineCheckboxTwo = screen.getByTestId("cuisine-checkbox-bbq");
    expect(cuisineCheckboxTwo).toHaveClass("border-green-600");
    await userEvent.click(cuisineCheckboxTwo);
    expect(cuisineCheckboxTwo).toHaveClass("border-orange-400");
  });
});
