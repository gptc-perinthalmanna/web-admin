import adminRoute from "helpers/routes/adminRoute";
import { getAllNews } from "server/newsAndMedia";

export default adminRoute(async () => {
  return await getAllNews();
});
