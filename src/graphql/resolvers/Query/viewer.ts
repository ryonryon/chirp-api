import { AuthenticationError } from "apollo-server-fastify";
import { getConnection } from "typeorm";
import User from "../../../entities/User";
import { Context } from "../../context";

export default async function viewer(_: any, __: any, context: Context) {
  if (!context.user)
    throw new AuthenticationError("Authentication is required.");

  return await getConnection().getRepository(User).findOne(context.user.id);
}
