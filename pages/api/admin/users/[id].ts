import adminRoute from "helpers/routes/adminRoute";
import { getUser } from "server/users";

export default adminRoute(async (req) => {
    const { id } = req.query;
      if (typeof id !== "string") return {
        error: "User not found",
      }
  return await getUser(id);
});
