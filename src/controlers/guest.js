import { ForbiddenError } from "apollo-server-errors";

import * as repository from "../repositories/guest.js";

export async function changeConfirmation(parent, { guest }, { userId }, info) {
  const guestStatus = await repository.editGuest(guest, userId);
  if (!guestStatus) throw new ForbiddenError();
  return guestStatus.guests[0];
}
