import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import QueryClientProviderWrapper from "@/components/providers/QueryClientProvider";
import ShowDistanceButton from "../ShowDistanceButton";
import { useGeolocationToggle } from "../../hooks/useGeolocation";

jest.mock("../../hooks/useGeolocation");

describe("ShowDistanceButton", () => {
  const mockHandleActivateGeolocation = jest.fn();
  const mockUseGeolocationToggle = {
    active: false,
    handleActivateGeolocation: mockHandleActivateGeolocation,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGeolocationToggle as any).mockReturnValue(mockUseGeolocationToggle);
  });

  test("renders correctly with initial inactive state", () => {
    render(
      <QueryClientProviderWrapper>
        <ShowDistanceButton />
      </QueryClientProviderWrapper>,
    );
    expect(screen.getByText(/show distance/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("font-semibold hover:bg-white hover:text-orange-600 group items-end");
    expect(screen.getByRole("button").querySelector(".bg-orange-100")).toBeNull();
  });

  test("button shows active state when geolocation is active", () => {
    mockUseGeolocationToggle.active = true;
    render(
      <QueryClientProviderWrapper>
        <ShowDistanceButton />
      </QueryClientProviderWrapper>,
    );
    expect(screen.getByRole("button").querySelector(".bg-orange-100")).toBeInTheDocument();
  });
});
