import { useGetMyUser, useUpdateMyUser } from "@/lib/api/MyUserApi";
import Meta from "@/components/misc/Meta";
import UserProfileForm from "./components/UserProfileForm";

function UserProfilePage() {
  const { updateUser, isLoading: isLoadingPATCH } = useUpdateMyUser();
  const { user, isLoading: isLoadingGET } = useGetMyUser();
  if (isLoadingGET) {
    return <span>Loading...</span>;
  }
  if (!user) {
    return <span className="text-red-500">Could not load user profile</span>;
  }
  return (
    <Meta
      title="Profile"
    >
      <div className="flex flex-col gap-12 md:px-[6rem] lg:px-[12rem] ">
        <UserProfileForm
          onSave={updateUser}
          isLoading={isLoadingPATCH}
          user={user}
        />
      </div>
    </Meta>
  );
}

export default UserProfilePage;
