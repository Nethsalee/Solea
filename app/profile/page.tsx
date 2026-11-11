import ProfileForm from "@/components/ProfileForm";

export const metadata = {
  title: "My Profile | SOLEA",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return <ProfileForm />;
}
