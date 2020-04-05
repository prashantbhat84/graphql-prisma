const Query = {
  me() {
    return {
      id: "abc123",
      name: "Prashant Bhat",
      email: "prashant@gmail.com",
    };
  },
  post() {
    return {
      id: "alpa123",
      title: "My graphql api",
      body: "My own api",
      published: false,
    };
  },
  users(parent, args, { prisma }, info) {
    const opArgs = {};
    if (args.query) {
      // check the  schema in graphql playground
      opArgs.where = {
        OR: [{ name_contains: args.query }, { email_contains: args.query }],
      };
    }
    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const opArgsPost = {};
    if (args.query) {
      opArgsPost.where = {
        OR: [{ title_contains: args.query }, { body_contains: args.query }],
      };
    }
    return prisma.query.posts(opArgsPost, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
};

export { Query as default };
