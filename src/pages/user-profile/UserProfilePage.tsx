import { useUpdateMyUser } from "@/lib/api/MyUserApi";
import UserProfileForm from "./components/UserProfileForm";

function UserProfilePage() {
  const { updateUser, isLoading } = useUpdateMyUser();
  return (
    <div className="flex flex-col gap-12">
      <UserProfileForm
        onSave={updateUser}
        isLoading={isLoading}
      />
    </div>
  );
}

export default UserProfilePage;
