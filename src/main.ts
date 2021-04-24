import * as dotenv from "dotenv";
import Fastify from "fastify";
import { createConnection } from "typeorm";
import dashboard from "./admin";
import apollo from "./graphql";

import "reflect-metadata";

dotenv.config();

const fastify = Fastify();

(async () => {
  await createConnection();

  try {
    fastify.register(dashboard);
    fastify.register(apollo.createHandler());

    await fastify.listen({
      host: "0.0.0.0",
      port: 4000,
    });

    console.log(`🚀 Server ready at http://localhost:4000`);
  } catch (e) {
    console.error(e);

    process.exit(1);
  }
})();
