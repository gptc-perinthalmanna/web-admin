import adminRoute from "helpers/routes/adminRoute";
import { getAllImages } from "server/files";

export default adminRoute(async () => {
  return getAllImages();
});
