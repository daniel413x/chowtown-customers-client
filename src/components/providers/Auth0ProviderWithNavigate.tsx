import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { ReactNode } from "react";

interface Auth0ProviderWithNavigateProps {
  children: ReactNode;
}

function Auth0ProviderWithNavigate({
  children,
}: Auth0ProviderWithNavigateProps) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
  if (!domain || !clientId || !redirectUri) {
    throw new Error("some Auth0 environment variables were missing");
  }
  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log("USER: ", user);
    return null;
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithNavigate;
