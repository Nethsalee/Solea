import LoginForm from "@/components/LoginForm";
export const metadata = { title: "Your Account | SOLEA", description: "Sign in to your SOLEA account.", robots: { index: false, follow: false } };
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string | string[] }> }) {
  const { next } = await searchParams;
  return <LoginForm destination={next === "profile" ? "/profile" : "/"} />;
}
