import adminRoute from "helpers/routes/adminRoute";
import { getAllUsers } from "server/users";

export default adminRoute(async () => {
  const users = await getAllUsers();
  return users;
});
