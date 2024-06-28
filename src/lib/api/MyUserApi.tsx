import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { errorCatch } from "../utils";
import { USER_ROUTE } from "../consts";
import { User } from "../types";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const getMyUserReq: () => Promise<User> = async () => {
    if (!user?.sub) {
      throw new Error("user object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const id = encodeURIComponent(user.sub);
    const res = await fetch(`${API_BASE_URL}/${USER_ROUTE}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("failed to get user");
    }
    return res.json();
  };
  const { data: fetchedUser, isLoading, error } = useQuery("getMyUser", getMyUserReq);
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    user: fetchedUser, isLoading,
  };
};

type CreateUserReq = {
  auth0Id: string;
  email: string;
}

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserReq = async (user: CreateUserReq) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/${USER_ROUTE}`, {
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

type UpdateUserReq = Pick<User, "name" | "addressLineOne" | "city" | "country"> & Partial<Pick<User, "location">>;

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const updateMyUserReq = async (formData: UpdateUserReq) => {
    if (!user?.sub) {
      throw new Error("user object was not defined");
    }
    const accessToken = await getAccessTokenSilently();
    const id = encodeURIComponent(user.sub);
    const res = await fetch(`${API_BASE_URL}/${USER_ROUTE}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      if (await res.text() === "Invalid address") {
        throw new Error("Could not validate provided address, please try again");
      } else {
        throw new Error("Failed to update user");
      }
    }
  };
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateMyUserReq);
  if (isSuccess) {
    toast.success("User profile updated!");
  }
  if (error) {
    toast.error(errorCatch(error));
  }
  return {
    updateUser,
    isLoading,
    isSuccess,
  };
};

export const getCoords = async () => {
  const res = await fetch(`${API_BASE_URL}/${USER_ROUTE}/coords`);
  if (!res.ok) {
    toast.error("Could not get user location");
  }
  return res.json();
};
