import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserProfileForm from "../UserProfileForm";
import "@testing-library/jest-dom";

const user = {
  id: "userId",
  email: "user@gmail.com",
  name: "theUserName",
  addressLineOne: "theUserAddress",
  city: "theUserCity",
  country: "theUserCountry",
};

test("renders an error in the respective field if submit is attempted with a missing field", async () => {
  const { container } = render(
    <UserProfileForm user={user} isLoading={false} onSave={() => {}} />,
  );
  const nameField = screen.getByTestId("user-profile-form-name-field");
  await userEvent.clear(nameField);
  const submitBtn = screen.getByTestId("user-profile-form-submit-btn");
  await userEvent.click(submitBtn);
  const errorMessage = container.querySelector("p.text-destructive");
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent("Name is required");
});
