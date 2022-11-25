import { v4 as uuidv4 } from "uuid";
import {
  facilitiesDb,
  campusDB,
  imagesDB,
  usersDb,
  eventsDB,
  CampusPageType,
  UserType,
  FacilityPageType,
  ImageType,
  EventType,
  deletedDB,
} from "./db";
import { getMultipleUsers } from "./users";

interface PhotoType {
  src: string;
  alt: string;
  thumbnail: string;
}

export async function createPage(data: any, type = "facility") {
  if (type === "facility") {
    return facilitiesDb.put(data) as unknown as FacilityPageType | null;
  } else if (type === "campus") {
    return campusDB.put(data) as unknown as CampusPageType | null;
  }
}

export async function getFacilities(key: string) {
  const facility = (await facilitiesDb.get(
    key
  )) as unknown as FacilityPageType | null;
  if (!facility) {
    return null;
  }
  let unresolvedpromises: any;
  let photos: PhotoType[] = Array();

  unresolvedpromises = facility?.photos_id?.map(async (element) => {
    const image = (await imagesDB.get(element)) as unknown as ImageType | null;
    if (image) {
      photos.push({
        src: image.url,
        alt: image.title,
        thumbnail: image.thumb.url,
      });
    }
    return image;
  });
  if (unresolvedpromises) await Promise.all(unresolvedpromises);

  const staffs = await getMultipleUsers(facility.staffs_ids);

  return { ...facility, photos, staffs };
}

export async function getAllFacilites() {
  const facilities = (await facilitiesDb.fetch()).items as unknown as
    | FacilityPageType[]
    | null;
  let _staffsDir: { [key: string]: UserType } = {}; // Cache staffs
  const ret = facilities.map(async (facility) => {
    let { staffs, staffsDir } = await populateStaffs(
      facility.staffs_ids,
      _staffsDir
    );
    _staffsDir = staffsDir;
    return { ...facility, staffs };
  });
  return Promise.all(ret);
}

export async function getCampus(key: string) {
  const campus = (await campusDB.get(key)) as unknown as CampusPageType | null;
  if (!campus || campus == null) {
    return null;
  }
  const staffs = await getMultipleUsers(campus.staffs_ids);
  return { ...campus, staffs };
}

export async function getAllCampus() {
  const campus = (await campusDB.fetch()).items as unknown as
    | CampusPageType[]
    | null;
  let _staffsDir: { [key: string]: UserType } = {}; // Cache staffs
  const ret = campus.map(async (_campus) => {
    let { staffs, staffsDir } = await populateStaffs(
      _campus.staffs_ids,
      _staffsDir
    );
    _staffsDir = staffsDir;
    return { ..._campus, staffs };
  });
  return Promise.all(ret);
}

// HELPER Functions

export async function populateStaffs(
  staffs_ids: string[],
  staffsDir: { [key: string]: UserType }
) {
  let unresolvedpromises = staffs_ids.map(async (element) => {
    if (element in staffsDir) {
      return staffsDir[element];
    }
    const staff = (await usersDb.get(element)) as unknown as UserType | null;
    if (staff) {
      staffsDir[element] = staff;
    }
    return staff;
  });
  const staffs = await Promise.all(unresolvedpromises);
  return { staffs, staffsDir };
}

// Events

export async function getEvents(page_id: string) {
  return (await eventsDB.fetch({ "tags?contains": page_id }))
    .items as unknown as EventType[] | null;
}

export async function getEvent(key: string) {
  return eventsDB.get(key) as unknown as EventType | null;
}

export async function getAllEvents(limit = 20) {
  return (await eventsDB.fetch({}, { limit })).items as unknown as
    | EventType[]
    | null;
}

export async function createEvent(event: {}) {
  return eventsDB.put(event);
}

export async function deleteEvent(key: string) {
  let deleted = await eventsDB.get(key);
  if (!deleted) return null;
  await deletedDB.put({ ...deleted, key: uuidv4() });
  await eventsDB.delete(key);
  return true;
}
