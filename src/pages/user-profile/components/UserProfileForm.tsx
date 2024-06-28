import LoadingButton from "@/components/ui/common/LoadingButton";
import { Button } from "@/components/ui/common/shadcn/button";
import {
  FormControl, FormDescription, FormField, FormItem, FormLabel, Form, FormMessage,
} from "@/components/ui/common/shadcn/form";
import { Input } from "@/components/ui/common/shadcn/input";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { User } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddressAutocomplete from "./AddressAutocomplete";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  addressLineOne: z.string().min(1, {
    message: "Address is required",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  // if lat and lng are not set in this form, they will be set in the backend user service
  location: z.tuple([z.number(), z.number()]).optional(),
});

export type UserFormData = z.infer<typeof formSchema>;

interface UserProfileFormProps {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  user: User;
  title?: string;
  desc?: string;
  buttonText?: ReactNode;
}

function UserProfileForm({
  onSave,
  isLoading,
  user,
  title = "Your Profile",
  desc = "View and change your profile information here",
  buttonText = "Submit",
}: UserProfileFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      addressLineOne: user.addressLineOne,
      email: user.email,
      city: user.city,
      country: user.country,
      location: user.location,
    },
  });
  const { handleSubmit } = form;
  const handleSelectAutocomplete = (place: google.maps.places.PlaceResult) => {
    let addressLineOne;
    if (place.name) {
      addressLineOne = place.name;
    }
    let city;
    let country;
    if (place.address_components) {
      city = place.address_components[2].long_name;
      country = place.address_components[5].long_name;
    }
    if (addressLineOne) {
      form.setValue("addressLineOne", addressLineOne);
    }
    if (city) {
      form.setValue("city", city);
    }
    if (country) {
      form.setValue("country", country);
    }
    if (place.geometry?.location) {
      form.setValue("location", [place.geometry.location.lng(), place.geometry.location.lat()]);
    }
  };
  useEffect(() => {
    form.reset(user);
  }, [user, form]);
  return (
    <Form
      {...form}
    >
      <form
        onSubmit={handleSubmit(onSave)}
        className="space-y-4 rounded-lg"
      >
        <div>
          <h2 className="text-2xl font-bold">
            {title}
          </h2>
          <FormDescription>
            {desc}
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled
                  className="bg-white"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  data-testid="user-profile-form-name-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLineOne"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Address Line One
                </FormLabel>
                <FormControl>
                  <AddressAutocomplete handleSelectAutocomplete={handleSelectAutocomplete}>
                    <Input
                      {...field}
                      className="bg-white"
                    />
                  </AddressAutocomplete>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Country
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            className="bg-orange-500"
            type="submit"
            data-testid="user-profile-form-submit-btn"
          >
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
}

export function UserProfileFormSkeleton() {
  return (
    <div className="flex flex-col md:p-10 space-y-4 h-[416px]">
      <Skeleton className="h-10 w-[200px]" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-10 w-24" />
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
}

export default UserProfileForm;
