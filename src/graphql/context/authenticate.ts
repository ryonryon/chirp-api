import { AuthenticationError } from "apollo-server-fastify";
import * as admin from "firebase-admin";
import { getConnection } from "typeorm";
import User from "../../entities/User";

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
  }),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export default async ({ request }: any, context: any): Promise<any> => {
  if (
    !request.headers.authorization ||
    !request.headers.authorization.startsWith("Bearer ")
  )
    throw new AuthenticationError("Authentication is required.");

  const token = request.headers.authorization.substring(7);
  let decodedToken: admin.auth.DecodedIdToken;

  try {
    decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
  } catch (err) {
    console.error(err);

    return context;
  }

  const user = await getConnection().transaction(async (manager) => {
    const user = await manager
      .getRepository(User)
      .findOne({ where: { token: decodedToken.uid } });

    if (user) return user;

    const result = await manager.getRepository(User).insert({
      email: decodedToken.email ?? "",
      name: decodedToken.name ?? "No Name",
      avatarUrl: decodedToken.picture ?? "",
      token: decodedToken.uid,
    });

    const createdUser = await manager
      .getRepository(User)
      .findOne(result.identifiers[0].id);

    if (!createdUser)
      throw new Error(
        "User generation failed. No new user was successfully created."
      );

    return createdUser;
  });

  return { ...context, user };
};
