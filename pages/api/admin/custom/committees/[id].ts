import adminRoute from "helpers/routes/adminRoute";
import { getCommittee } from "server/customCommitties";

export default adminRoute(async (req) => {
  const { id } = req.query;
  if (typeof id !== "string")
    return {
      error: "User not found",
    };
  const title = decodeURI(id);
  return getCommittee(title);
});
