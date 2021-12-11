import adminRoute from "helpers/routes/adminRoute";
import { getAllFIles } from "server/files";

export default adminRoute(async () => {
    return await getAllFIles();
});
