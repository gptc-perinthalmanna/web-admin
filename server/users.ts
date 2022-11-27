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

export async function getAllUsers(role?: string) {
  const query = role ? { "role?contains": role } : {};
  console.log(query);
  const users = await usersDb.fetch(query);
  if (users.count === 0) return [];
  return users.items as unknown as UserType[] | undefined;
}

export async function getUser(key: string) {
  const user = await usersDb.get(key);
  return user as unknown as UserType | null;
}

export async function getMultipleUsers(users: string[]) {
  const query = users.map((e) => ({ key: e }));
  return (await usersDb.fetch(query)).items as unknown as UserType[];
}

export async function getUserbyUsername(username: string) {
  const users = await usersDb.fetch({ phone: username });
  return users.count > 0 ? (users.items as unknown as UserType[])[0] : null;
}

export async function createUser(user: any) {
  const newUser = await usersDb.put(user);
  return newUser as unknown as UserType | undefined;
}

export async function updateAvatarUser(key: string, avatar: string) {
  const user = await usersDb.update({ avatar: avatar }, key);
  return user as unknown as UserType | undefined;
}
