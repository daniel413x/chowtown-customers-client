import LoadingButton from "@/components/ui/common/LoadingButton";
import { Button } from "@/components/ui/common/shadcn/button";
import {
  FormControl, FormDescription, FormField, FormItem, FormLabel, Form, FormMessage,
} from "@/components/ui/common/shadcn/form";
import { Input } from "@/components/ui/common/shadcn/input";
import { Skeleton } from "@/components/ui/common/shadcn/skeleton";
import { User } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
});

export type UserFormData = z.infer<typeof formSchema>;

interface UserProfileFormProps {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  user: User;
  title?: string;
  desc?: string;
  buttonText?: string;
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
    },
  });
  const { handleSubmit } = form;
  useEffect(() => {
    form.reset(user);
  }, [user, form]);
  return (
    <Form
      {...form}
    >
      <form
        onSubmit={handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
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
