import { usersDb } from "./db";

interface UserType {
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
  socialLinks: {
    facebook: string;
    linkedin: string;
    instagram: string;
    whatsapp: string;
  };
}

export async function getAllUsers() {
  const users = await usersDb.fetch();
  return users.items as unknown as UserType[] | undefined;
}

export async function getUser(key: string) {
  const user = await usersDb.get(key);
  return user as unknown as UserType | null;
}

export async function createUser(user: any) {
  const newUser = await usersDb.put(user);
  return newUser as unknown as UserType | undefined;
}

export async function updateAvatarUser(key: string, avatar: string) {
  const user = await usersDb.update({ avatar: avatar }, key);
  return user as unknown as UserType | undefined;
}
