import { getConnection } from "typeorm";
import Friend from "../../../entities/Friend";
import User, { UserId } from "../../../entities/User";
import { Context } from "../../context";

export default async function addFriend(
  _: any,
  { friendId }: { friendId: string },
  { user }: Context
) {
  const connection = getConnection();

  const friend = await connection.getRepository(User).findOne(friendId);

  if (!friend) throw new Error(`friendId:${friendId} doesn't exist.`);

  const newFriend = new Friend();
  newFriend.user = user.id;
  newFriend.friendUser = friendId as UserId;

  return await connection.getRepository(Friend).insert(newFriend);
}
