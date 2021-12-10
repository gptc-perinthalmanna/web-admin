import adminRoute from "helpers/routes/adminRoute";
import { getAllEvents } from "server/pages";

export default adminRoute(async () => {
  const data = await getAllEvents();
  return data;
});
