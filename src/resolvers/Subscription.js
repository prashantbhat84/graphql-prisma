const subscription = {
  comment: {
    subscribe(parent, { postid }, { prisma }, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: { id: postid },
            },
          },
        },
        info
      );
    },
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info
      );
    },
  },
};

export { subscription as default };
