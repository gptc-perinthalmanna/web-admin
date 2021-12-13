import adminRoute from "helpers/routes/adminRoute";
import { getAllCommittee } from "server/customCommitties";

export default adminRoute(async () => {
  return getAllCommittee();
});
