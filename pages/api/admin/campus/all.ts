import adminRoute from "helpers/routes/adminRoute";
import { getAllCampus } from "server/pages";

export default adminRoute(async () => {
  return await getAllCampus();
});