import adminRoute from "helpers/routes/adminRoute";
import { getUser } from "server/users";

export default adminRoute(
  async (req) => {
    const { id } = req.query;
    const currentUser = await getUser(req.session.user.key);
    if (currentUser.key !== id && !currentUser.role.includes("admin"))
      return {
        error: "Unauthorized",
      };
    if (typeof id !== "string")
      return {
        error: "User not found",
      };
    const user = await getUser(id);
    return { ...user, password: undefined };
  },
  ["any"]
);
