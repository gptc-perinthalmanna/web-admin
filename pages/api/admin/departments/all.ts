import adminRoute from "helpers/routes/adminRoute";
import { getAllDepartments } from "server/departments";

export default adminRoute(async () => {
  return await getAllDepartments();
});
