import { NextApiRequest, NextApiResponse } from "next";
import { getDeptFacilites } from "../../../server/facilities";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{} | { error: string }>
  ) {
    if (req.method === "GET") {
      const { id } = req.query;
      if (typeof id !== "string") return error(res);
      const departmentPageProps = await getDeptFacilites(id);
      if (departmentPageProps) {
        res.status(200).json(departmentPageProps);
      } else {
        return error(res);
      }
    }
  }
  
  function error(res: NextApiResponse<{} | { error: string }>) {
    res.status(404).json({
      error: "Department not found",
    });
  }