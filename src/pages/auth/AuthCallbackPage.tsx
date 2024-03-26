import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "@/lib/api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user, loginWithRedirect } = useAuth0();
  const { createMyUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false);
  useEffect(() => {
    // important for cypress
    if (!user) {
      loginWithRedirect();
    }
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createMyUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [hasCreatedUser]);
  return (
    <>Loading...</>
  );
}

export default AuthCallbackPage;
