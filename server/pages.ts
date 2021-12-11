import { facilitiesDb, campusDB, imagesDB, usersDb, eventsDB, CampusPageType, UserType, FacilityPageType, ImageType, EventType } from "./db";

interface StaffType {
  name: string;
  designation: string;
  social?: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

interface PhotoType {
  src: string;
  alt: string;
  thumbnail: string;
}

export async function getFacilities(key: string) {
  const facility = (await facilitiesDb.get(
    key
  )) as unknown as FacilityPageType | null;
  if (!facility) {
    return null;
  }
  let unresolvedpromises: any
  let photos : PhotoType[] = Array();
  let staffs : StaffType[] = Array();

  unresolvedpromises = facility?.photos_id?.map(async (element) => {
    const image = (await imagesDB.get(element)) as unknown as ImageType | null;
    if (image) {
      photos.push({
        src: image.url,
        alt: image.title,
        thumbnail: image.thumb.url,
      });
    }
    return image
  });
  unresolvedpromises = facility?.staffs_ids?.map(async (element) => {
    const staff = (await usersDb.get(element)) as unknown as UserType | null;
    if (staff) {
      staffs.push(staff);
    }
    return staff
  });
  if (unresolvedpromises) await Promise.all(unresolvedpromises)
  return {...facility, photos, staffs};
}

export async function getCampus(key: string) {
  const campus = (await campusDB.get(key)) as unknown as CampusPageType | null;
  if (!campus || campus == null) {
    return null;
  }
  let unresolvedpromises: any
  let staffs : UserType[] = [];
  unresolvedpromises = campus.staffs_ids?.map(async (element) => {
    const staff = (await usersDb.get(element)) as unknown as UserType | null;
    if (staff) {
      staffs.push(staff);
    }
    return staff
  })
  if (unresolvedpromises) await Promise.all(unresolvedpromises)
  return {...campus, staffs};
}


export async function getEvents(page_id: string) {
  const events = (await eventsDB.fetch({"tags?contains" : page_id})).items as unknown as EventType[] | null;
  return events;
}

export async function getEvent(key: string) {
  const event = (await eventsDB.get(key)) as unknown as EventType | null;
  return event;
}

export async function getAllEvents() {
  const events = (await eventsDB.fetch({}, {limit: 10})).items as unknown as EventType[] | null;
  return events;
}

export async function createEvent(event: {}) {
  const event_id = await eventsDB.put(event);
  return event_id;
}


export async function createPage(type = 'facility', data: any) {
  if (type === 'facility') {
    const facility = (await facilitiesDb.put(data)) as unknown as FacilityPageType | null;
    return facility;
  } else if (type === 'campus') {
    const campus = (await campusDB.put(data)) as unknown as CampusPageType | null;
    return campus;
  }
}


export async function getAllFacilites() {
  const facilities = (await facilitiesDb.fetch()).items as unknown as FacilityPageType[] | null;
  let _staffsDir: { [key:string] : UserType} = {};  // Cache staffs
  const ret = facilities.map(async (facility) => {
    let {staffs, staffsDir} = await populateStaffs(facility.staffs_ids, _staffsDir)
    _staffsDir = staffsDir;
    return {...facility, staffs}
  })
  return await Promise.all(ret)
}


export async function getAllCampus() {
  const campus = (await campusDB.fetch()).items as unknown as CampusPageType[] | null;
  let _staffsDir: { [key:string] : UserType} = {};  // Cache staffs
  const ret = campus.map(async (campus) => {
    let {staffs, staffsDir} = await populateStaffs(campus.staffs_ids, _staffsDir)
    _staffsDir = staffsDir;
    return {...campus, staffs}
  })
  return await Promise.all(ret)
}


async function populateStaffs(staffs_ids: string[], staffsDir: { [key:string] : UserType} ) {
  let unresolvedpromises = staffs_ids.map(async (element) => {
    if (element in staffsDir) {
      return staffsDir[element]
    }
    const staff = (await usersDb.get(element)) as unknown as UserType | null;
    if (staff) {
      staffsDir[element] = staff;
    }
    return staff
  })
  const staffs = await Promise.all(unresolvedpromises)
  return {staffs, staffsDir}
}
  
