import { getConnection } from "typeorm";
import User from "../../../entities/User";
import { Context } from "../../context";

export default async function viewer(_: any, __: any, { user }: Context) {
  return await getConnection().getRepository(User).findOne(user.id);
}
