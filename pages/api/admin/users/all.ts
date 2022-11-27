import adminRoute from "helpers/routes/adminRoute";
import { getAllUsers } from "server/users";

export default adminRoute(async (req) => {
  const query = req.query?.role?.toString() || undefined;
  const users = await getAllUsers(query);
  return users;
});
