import { useRouter } from "next/router";
import React, {useEffect} from "react";

import useUser from "lib/useUser";
import Admin from "layouts/Admin.js";

function Me() {
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    if (!user) return;
    router.push("/admin/users/edit/" + user.key);
  }, [user]);
  return <div></div>;
}

export default Me;
Me.layout = Admin;
