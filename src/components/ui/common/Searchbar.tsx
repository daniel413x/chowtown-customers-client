import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { SEARCH_ROUTE } from "@/lib/consts";
import {
  Form, FormControl, FormField, FormItem,
} from "./shadcn/form";
import { Input } from "./shadcn/input";
import { Button } from "./shadcn/button";

const formSchema = z.object({
  searchTerm: z.string().min(1, {
    message: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

interface SearchbarProps {
  placeholder: string;
  searchTerm?: string;
  onSubmit?: (formData: SearchForm) => void;
  onReset?: () => void;
}

function Searchbar({
  placeholder,
  searchTerm,
  onSubmit,
  onReset,
}: SearchbarProps) {
  const navigate = useNavigate();
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: searchTerm || "",
    },
  });
  const handleSearchSubmitDefault = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/${SEARCH_ROUTE}/${searchFormValues.searchTerm}`,
    });
  };
  const handleReset = () => {
    form.reset({
      searchTerm: "",
    });
    if (onReset) {
      onReset();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || handleSearchSubmitDefault)}
        className={cn("flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 md:mx-5 border-orange-200/50", {
          "border-red-500": form.formState.errors.searchTerm,
        })}
        data-testid="searchbar-form"
      >
        <Search
          className="ml-1 text-orange-500 hidden md:block"
          strokeWidth={2.5}
          size={30}
        />
        <FormField
          control={form.control}
          name="searchTerm"
          render={(({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  data-testid="searchbar-input"
                />
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
          data-testid="searchbar-submit"
        >
          Search
        </Button>
      </form>
    </Form>
  );
}

export default Searchbar;
