import LoadingButton from "@/components/ui/common/LoadingButton";
import { Button } from "@/components/ui/common/shadcn/button";
import {
  FormControl, FormDescription, FormField, FormItem, FormLabel, Form, FormMessage,
} from "@/components/ui/common/shadcn/form";
import { Input } from "@/components/ui/common/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
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

type UserFormData = z.infer<typeof formSchema>;

interface UserProfileFormProps {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
}

function UserProfileForm({
  onSave,
  isLoading,
}: UserProfileFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      addressLineOne: "",
      email: "",
      city: "",
      country: "",
    },
  });
  const { handleSubmit } = form;
  return (
    <Form
      {...form}
    >
      <form
        onSubmit={handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div className="">
          <h2 className="text-2xl font-bold">
            User Profile Form
          </h2>
          <FormDescription className="">
            View and change your profile information here
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
          >
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}

export default UserProfileForm;
