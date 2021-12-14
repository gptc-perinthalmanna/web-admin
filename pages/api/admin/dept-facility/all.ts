import adminRoute from "helpers/routes/adminRoute";
import { getAllDeptFacilites } from "server/facilities";

export default adminRoute(async () => {
  return  getAllDeptFacilites();
});
