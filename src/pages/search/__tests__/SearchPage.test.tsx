import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  MemoryRouter, Route, Routes, useLocation,
} from "react-router-dom";
import QueryClientProviderWrapper from "@/components/providers/QueryClientProvider";
import * as RestaurantApiHooks from "@/lib/api/RestaurantApi";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import SearchPage from "../SearchPage";

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="search-param-location-string">{location.search}</div>;
}

function LocationHelper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={["/search"]}>
      <Routes>
        <Route
          path="/search"
          element={(
            <>
              <LocationDisplay />
              {children}
            </>
          )}
        />
      </Routes>
    </MemoryRouter>
  );
}

jest.mock("@/lib/api/RestaurantApi", () => ({
  useSearchRestaurants: jest.fn(),
}));

jest.mocked(RestaurantApiHooks.useSearchRestaurants).mockReturnValue({
  data: {
    rows: [{
      restaurantName: "",
      slug: "",
      imageUrl: "",
      city: "",
      country: "",
      deliveryPrice: "",
      estimatedDeliveryTime: "",
      cuisines: [],
      menuItems: [],
      lastUpdated: "",
      isActivatedByUser: "",
      id: "1",
    }],
    pagination: {
      page: 1,
      pages: 1,
      pageLimitReached: true,
    },
  },
  isLoading: false,
  isFetching: false,
  currentRowsLength: 1,
} as any);

describe("SearchPage", () => {
  test("should set search params with searchbar input upon searchbar form submission", async () => {
    render(
      <QueryClientProviderWrapper>
        <LocationHelper>
          <SearchPage />
        </LocationHelper>
      </QueryClientProviderWrapper>,
    );
    const searchbarInput = screen.getByTestId("searchbar-input");
    await userEvent.type(searchbarInput, "Burger King");
    const searchbarSubmit = screen.getByTestId("searchbar-submit");
    await userEvent.click(searchbarSubmit);
    await waitFor(() => {
      const locationDisplay = screen.getByTestId("search-param-location-string");
      expect(locationDisplay.textContent).toContain("searchTerm=Burger+King");
    });
  });
});
