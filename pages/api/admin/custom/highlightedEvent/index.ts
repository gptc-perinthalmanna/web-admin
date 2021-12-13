import adminRoute from "helpers/routes/adminRoute";
import { getHighlightedEvent } from "server/customHighlightedEvent";

export default adminRoute(async () => {
  return getHighlightedEvent();
});
