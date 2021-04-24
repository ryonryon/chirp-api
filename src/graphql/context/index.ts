import { FastifyRequest } from "fastify";
import User from "../../entities/User";
import authenticate from "./authenticate";

export default async (request: FastifyRequest) => {
  let context = {};

  context = await authenticate(request, context);

  return context;
};

export interface Context {
  user: User | null;
}
