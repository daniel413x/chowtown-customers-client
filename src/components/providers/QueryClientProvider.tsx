import { ReactNode } from "react";
import { QueryClient, QueryClientProvider as QueryClientProviderWrapper } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

interface QueryClientProviderProps {
  children: ReactNode;
}

function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  return (
    <QueryClientProviderWrapper
      client={queryClient}
    >
      {children}
    </QueryClientProviderWrapper>
  );
}

export default QueryClientProvider;
