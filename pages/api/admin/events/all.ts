import roles from "constants/roles";
import adminRoute from "helpers/routes/adminRoute";
import { getAllEvents } from "server/pages";

export default adminRoute(
  async () => {
    return getAllEvents(40);
  },
  roles.filter((e) => !["student", "staff"].includes(e))
);
