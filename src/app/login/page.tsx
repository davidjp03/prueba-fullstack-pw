"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if ( session) {
      router.push("/user-dashboard");
    }
  }, [session, router]);

  const handleGitHubSignIn = async () => {
    const { signIn } = await import("@/lib/auth-client");
    await signIn.social({
      provider: "github",
      callbackURL: "/user-dashboard",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleGitHubSignIn}
        className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
