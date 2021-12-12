import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useUser from "./useUser";

function useRole(role: string) {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      return;
    }
    if (!user.role.includes(role)) {
      router.push("/dashboard");
    }
  }, [user, role]);
}

export default useRole;
