import User from "../../entities/User";

export default {
  userId: ({ id }: User, _: any) => {
    return id;
  },
  friends: () => {
    return [];
  },
  rooms: () => {
    return [];
  },
};
