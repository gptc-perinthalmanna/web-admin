import {
  departmentsDB,
  DepartmentsType,
  deptFacilitiesDB,
  DepartmentFacilityType,
  usersDb,
  UserType,
} from "./db";

export async function getDepartments(key: string) {
  const department = (await departmentsDB.get(
    key
  )) as unknown as DepartmentsType | null;
  if (!department || department == null) {
    return null;
  }

  let staffs: UserType[] = [];
  department.staffs_ids?.forEach(async (element) => {
    const staff = (await usersDb.get(element)) as unknown as UserType | null;
    if (staff) {
      staffs.push(staff);
    }
  });

  let facilities: DepartmentFacilityType[] = [];
  const fetch = (await deptFacilitiesDB.fetch({
    "tags?contains": department.key,
  })) as unknown as { items: DepartmentFacilityType[] | null };
  fetch.items?.forEach((elm) => {
    facilities.push(elm);
  });

  return { ...department, staffs, facilities };
}

export async function createDepartmentPage(data: any) {
  const facility = (await departmentsDB.put(
    data
  )) as unknown as DepartmentFacilityType | null;
  return facility;
}
