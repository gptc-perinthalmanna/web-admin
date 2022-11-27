import adminRoute from "helpers/routes/adminRoute";
import { getAllUsers } from "server/users";

export default adminRoute(async (req) => {
  const query = req.query?.role?.toString() || undefined;
  console.log("Qure", query);
  const users = await getAllUsers(query);

  return users;
});
