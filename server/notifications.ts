import { deletedDB, notificationsDB, NotificationType } from "./db";
import { v4 as uuidv4 } from "uuid";

export async function getAllNotifications() {
  const res = await notificationsDB.fetch({ expired: false }, { limit: 10 });

  let nots = res.items as unknown as NotificationType[] | null;
  if (!nots) return null;

  const _nots = nots.map(async (not) => {
    not.expired = not.expiryDate < Date.now();
    if (not.expired) {
      await notificationsDB.update({ expired: true }, not.key.toString());
    }
    return not;
  });

  return Promise.all(_nots);
}

export async function getNotification(key: string) {
  return notificationsDB.get(
    key
  ) as unknown as Promise<NotificationType | null>;
}

export async function createNotificiations(data: {}) {
  return (await notificationsDB.put(data)) as unknown as NotificationType;
}

export async function deleteNotification(key: string) {
  let deleted = await notificationsDB.get(key);
  if (!deleted) return null;
  await deletedDB.put({ ...deleted, old_key: deleted.key, key: uuidv4() });
  await notificationsDB.delete(key);
  return true;
}
