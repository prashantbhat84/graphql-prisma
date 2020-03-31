const Query = {
  me() {
    return {
      id: "abc123",
      name: "Prashant Bhat",
      email: "prashant@gmail.com"
    };
  },
  post() {
    return {
      id: "alpa123",
      title: "My graphql api",
      body: "My own api",
      published: false
    };
  },
  users(parent, args, { prisma }, info) {
    // if (!args.query) {
    //   return db.users;
    // }
    // return db.users.filter(user => {
    //   return user.name.toLowerCase().includes(args.query.toLowerCase());
    // });
    return prisma.query.users(null, info);
  },
  posts(parent, args, { prisma }, info) {
    // const { posts } = ctx.db;
    // if (!args.search) {
    //   return posts;
    // }

    // return posts.filter(post => {
    //   return (
    //     post.body.toLowerCase().includes(args.search.toLowerCase()) ||
    //     post.title.toLowerCase().includes(args.search.toLowerCase())
    //   );
    // });
    return prisma.query.posts(null, info);
  },
  comments(parent, args, ctx, info) {
    return ctx.db.comments;
  }
};

export { Query as default };
