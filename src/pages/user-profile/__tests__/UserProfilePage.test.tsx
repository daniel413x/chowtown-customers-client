import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as UserApiHooks from "@/lib/api/MyUserApi";
import { MemoryRouter } from "react-router-dom";
import UserProfilePage from "../UserProfilePage";

jest.mock("@/lib/api/MyUserApi", () => ({
  useGetMyUser: jest.fn(),
  useUpdateMyUser: jest.fn(),
}));

jest.mocked(UserApiHooks.useUpdateMyUser).mockReturnValue({ updateUser: () => Promise.resolve() } as any);

describe("UserProfilePage", () => {
  it("renders loading state correctly", () => {
    jest.mocked(UserApiHooks.useGetMyUser).mockReturnValue({ user: undefined, isLoading: true });
    render(
      <MemoryRouter>
        <UserProfilePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error when user data cannot be loaded", () => {
    jest.mocked(UserApiHooks.useGetMyUser).mockReturnValue({ user: undefined, isLoading: false });
    render(
      <MemoryRouter>
        <UserProfilePage />
      </MemoryRouter>,
    );
    expect(screen.getByText("Could not load user profile")).toBeInTheDocument();
  });
});
