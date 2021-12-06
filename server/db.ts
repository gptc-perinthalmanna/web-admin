import { Deta } from "deta"; // import Deta

// Initialize with a Project Key
const deta = Deta(process.env.DETA_PROJECT_ID);

export const usersDb = deta.Base("users");

export const facilitiesDb = deta.Base("page_facilities");
export const campusDB = deta.Base("page_campus");
export const departmentsDB = deta.Base("page_departments");

export const pressAndMediaDB = deta.Base("post_press_and_media");
export const eventsDB = deta.Base("post_events");
export const notificationsDB = deta.Base("post_notifications");
export const deptFacilitiesDB = deta.Base("post_dept_facilities");
export const newsAndMediaDB = deta.Base("post_news_and_media");

export const filesDB = deta.Base("media_files");
export const imagesDB = deta.Base("media_images");

export const otherDB = deta.Base("other_details");

// Types Definitions

export interface NewsMediaType {
  key: string;
  title: string;
  author: string;
  date: string;
  description: string;
  url?: string;
}

export interface NotificationType {
  key: number;
  title: string;
  link?: string;
  createdAt: number;
  tags: string[];
  expired: boolean;
  deleted: boolean;
  expiryDate: number;
  category: string;
  author?: string;
}

export interface CampusPageType {
  key: string;
  title: string;
  about: string;
  cover: string;
  staffs_ids?: string[];
}

export interface UserType {
  key: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  designation: string;
  role: string;
  department: string;
  phone: string;
  address: string;
  avatar?: string;
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export interface FacilityPageType {
  key: string;
  title: string;
  about: string;
  cover: string;
  staffs_ids?: string[];
  photos_id?: string[];
}

export interface ImageType {
  key: string;

  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  size: string;
  time: string;
  expiration: string;
  image: {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
  };
  thumb: {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
  };
  delete_url: string;

  success: boolean;
  status: number;
}

export interface OtherType {
  key: string;
  value: { [key: string]: any };
}

export interface DepartmentsType {
  key: string;
  title: string;
  about: string;
  cover: string;
  staffs_ids: string[];
}

export interface PressAndMediaType {
  key: string;
  title: string;
  date: string;
  author_id: string;
  description: string;
}

export interface EventType {
  key: string;
  title: string;
  subtitle: string;
  image: string;
  date: string;
  type: string;
  tags: string[];
}

export interface DepartmentFacilityType {
  key: string;
  title: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
}

export interface FileType {
  key: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
}
