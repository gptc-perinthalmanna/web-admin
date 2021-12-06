import { notificationsDB, NotificationType } from "./db";

export async function getAllNotifications() {
  const res = await notificationsDB.fetch(
    { expired: false, deleted: false },
    { limit: 10 }
  );

  let nots = res.items as unknown as NotificationType[] | null;
  if (!nots) return null;

  nots.map(async (not) => {
    not.expired = (not.expiryDate) < Date.now();
    if (not.expired) {
      await notificationsDB.update({ expired: true }, not.key.toString());
    }
    return not;
  });

  return nots;
}

export async function createNotificiations(data: {}) {
  return (await notificationsDB.put(data)) as unknown as NotificationType;
}
