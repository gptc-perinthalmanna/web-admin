import adminRoute from "helpers/routes/adminRoute";
import { getAllFacilites } from "server/pages";

export default adminRoute(async () => {
  return await getAllFacilites();
});