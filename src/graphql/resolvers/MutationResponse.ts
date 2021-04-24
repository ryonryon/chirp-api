export default {
  __resolveType: (obj: any) => {
    if (obj.user) return "UserMutationResponse";

    return "DeletionMutationResponse";
  },
};
