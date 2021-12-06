import { otherDB, OtherType } from "./db";

export async function getOther(key: string) {
  const res = await otherDB.get(key) as unknown as  OtherType | null;
  if (!res) {
    return null;
  }
  return res.value;
}

export async function createOther(other: {}) {
  const res = await otherDB.put(other);
  return res as unknown as OtherType | null;
}

