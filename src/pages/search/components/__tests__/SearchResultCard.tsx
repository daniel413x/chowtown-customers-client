import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { haversineDistance } from "@/lib/utils";
import SearchResultCard from "../SearchResultCard";

const restaurantLat = 1;
const restaurantLng = 1;
const userLat = 2;
const userLng = 2;

const userCoords: [number, number] = [userLng, userLat];

const restaurant = {
  restaurantName: "",
  userId: "",
  slug: "",
  imageUrl: "",
  city: "",
  country: "",
  deliveryPrice: 0,
  estimatedDeliveryTime: 0,
  cuisines: [],
  menuItems: [],
  lastUpdated: "",
  isActivatedByUser: true,
  id: "1",
  location: [restaurantLng, restaurantLat] as [number, number],
};

describe("SearchResultCard", () => {
  test("displays the calculated Haversine distance if the user coordinates are available", () => {
    render(
      <MemoryRouter>
        <SearchResultCard restaurant={restaurant} userLocation={userCoords} />
        ,
      </MemoryRouter>,
    );
    expect(screen.getByTestId("distance")).toBeDefined();
  });

  test("accurately calculates the Haversine distance", () => {
    render(
      <MemoryRouter>
        <SearchResultCard restaurant={restaurant} userLocation={userCoords} />
        ,
      </MemoryRouter>,
    );
    expect(screen.getByTestId("distance")).toHaveTextContent(haversineDistance(userCoords, restaurant.location));
  });

  test("calculates < 1 for distances less than one mile", () => {
    render(
      <MemoryRouter>
        <SearchResultCard restaurant={restaurant} userLocation={[1.001, 1.001]} />
        ,
      </MemoryRouter>,
    );
    expect(screen.getByTestId("distance")).toHaveTextContent("< 1");
  });
});
