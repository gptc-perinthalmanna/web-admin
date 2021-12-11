import adminRoute from "helpers/routes/adminRoute";
import { getAllNotifications } from "server/notifications";

export default adminRoute(async () => {
  return await getAllNotifications();
});
