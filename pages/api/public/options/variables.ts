import type { NextApiRequest, NextApiResponse } from "next";

const designation = [
  { name: "Principal" },
  { name: "Head of Section" },
  { name: "Lecturer" },
  { name: "Assosiate Professor" },
  { name: "Assistant Professor" },
  { name: "Physical Education Instructor" },
  { name: "Workshop Instructor" },
  { name: "Demonstrator" },
  { name: "Trade Instructor" },
  { name: "Tradesman" },
  { name: "Senior Superintendent" },
  { name: "Head Accountant" },
  { name: "Clerk" },
  { name: "Senior Grade Typist" },
  { name: "UD Clerk" },
  { name: "LD Clerk" },
  { name: "Office Attendent" },
  { name: "Night Watcher" },
  { name: "Gardener" },
];

const departments = [
  { name: "electronics-dept" },
  { name: "electrical-dept" },
  { name: "civil-dept" },
  { name: "mechanical-dept" },
  { name: "general-dept" },
  { name: "office-section" },
  { name: "workshop-section" },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { [key: string]: { name: string }[] } | { error: string }
  >
) {
  if (req.method === "GET") {
    res.status(200).json({ designation, departments });
  }
  else {
    res.status(404).json({ error: "Not found" });
  }
}

