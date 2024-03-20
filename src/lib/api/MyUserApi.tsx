import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

type CreateUserReq = {
  auth0Id: string;
  email: string;
}

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserReq = async (user: CreateUserReq) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error("failed to create user");
    }
  };
  const {
    mutateAsync: createMyUser, isLoading, isError, isSuccess,
  } = useMutation(createMyUserReq);
  return {
    createMyUser, isLoading, isError, isSuccess,
  };
};
