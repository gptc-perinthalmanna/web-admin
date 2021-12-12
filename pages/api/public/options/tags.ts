import type { NextApiRequest, NextApiResponse } from "next";

const events = [
  {name: "electronics-dept"},
  {name: "electrical-dept"},
  {name: "civil-dept"},
  {name: "mechanical-dept"},
  {name: "general-dept"},
  {name: "office-section"},
  {name: "nss"},
  {name: "placement-cell"},
  {name: "boomithraseena-club"},
]

const notifications = [
  {name: "electronics-dept"},
  {name: "electrical-dept"},
  {name: "civil-dept"},
  {name: "mechanical-dept"},
  {name: "general-dept"},
  {name: "office-section"},
  
]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{[key:string]: {name: string}[]} | { error: string }>
) {
  if (req.method === "GET") {
    if (events) {
      res.status(200).json({events, notifications});
    } else {
      return error(res);
    }
  }
}

function error(res: NextApiResponse<any | { error: string }>) {
  res.status(404).json({
    error: "Notifications not found",
  });
}
