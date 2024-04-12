import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form, FormControl, FormField, FormItem,
} from "./shadcn/form";
import { Input } from "./shadcn/input";
import { Button } from "./shadcn/button";

const formSchema = z.object({
  searchQuery: z.string().min(1, {
    message: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

interface SearchbarProps {
  placeholder: string;
  onSubmit: (formData: SearchForm) => void;
  onReset?: () => void;
}

function Searchbar({
  placeholder,
  onSubmit,
  onReset,
}: SearchbarProps) {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });
  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5", {
          "border-red-500": form.formState.errors.searchQuery,
        })}
      >
        <Search
          className="ml-1 text-orange-500 hidden md:block"
          strokeWidth={2.5}
          size={30}
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={(({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input {...field} placeholder={placeholder} className="border-none shadow-none text-xl focus-visible:ring-0" />
              </FormControl>
            </FormItem>
          ))}
        />
        {form.formState.isDirty ? (
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={handleReset}
          >
            Clear
          </Button>
        ) : null}
        <Button
          type="submit"
          className="rounded-full bg-orange-500"
        >
          Search
        </Button>
      </form>
    </Form>
  );
}

export default Searchbar;
