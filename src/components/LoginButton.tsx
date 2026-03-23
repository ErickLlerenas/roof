"use client";

import { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LoginButton({ children, ...props }: ButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });
  };

  return (
    <Button onClick={handleGoogleLogin} disabled={loading} {...props}>
      {loading ? "Connecting..." : children}
    </Button>
  );
}