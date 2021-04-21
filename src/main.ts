import { createConnection } from "typeorm";
import apollo from "./graphql";

import "reflect-metadata";

(async () => {
  await createConnection();

  try {
    await apollo.listen({ port: 4000 });

    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  } catch (e) {
    console.error(e);

    process.exit(1);
  }
})();
