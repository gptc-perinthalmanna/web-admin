import { DepartmentFacilityType, deptFacilitiesDB } from "./db";

export async function getDeptFacilites(key: string) {
  const deptFacilities = (await deptFacilitiesDB.get(
    key
  )) as unknown as DepartmentFacilityType | null;
  if (!deptFacilities || deptFacilities == null) {
    return null;
  }
  return deptFacilities;
}

export async function createDeptFacility(data: any) {
  return deptFacilitiesDB.put(data) as unknown as DepartmentFacilityType | null;
}


export async function getAllDeptFacilites() {
  return (await deptFacilitiesDB.fetch()).items as unknown as DepartmentFacilityType[] | null;
}