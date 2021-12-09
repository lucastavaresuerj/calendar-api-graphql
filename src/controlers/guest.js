import * as repository from "../repositories/guest.js";

export async function changeConfirmation(parent, { guest }, { userId }, info) {
  return await repository.editGuest(guest, userId);
}
