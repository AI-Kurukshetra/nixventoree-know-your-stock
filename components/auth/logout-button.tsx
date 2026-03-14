"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="nav-link w-full"
      type="button"
      disabled={pending}
      onClick={() => {
        startTransition(() => {
          window.location.assign("/logout");
        });
      }}
    >
      <LogOut size={16} />
      <span>{pending ? "Logging out..." : "Logout"}</span>
      <span className="nav-dot" />
    </button>
  );
}
