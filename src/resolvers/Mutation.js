import bcrypt from "bcryptjs";
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) {
      throw new Error("Email Taken");
    }
    if (args.data.password.length < 8) {
      throw new Error("Must be 8 chars or more");
    }
    const password = await bcrypt.hash(args.data.password, 10);

    return await prisma.mutation.createUser(
      {
        data: {
          ...args.data,
          password,
        },
      },
      info
    );
  },
  async updateUser(parent, args, { prisma }, info) {
    return await prisma.mutation.updateUser(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
  async deleteUser(parent, args, { prisma }, info) {
    const user = await prisma.exists.User({ id: args.id });
    if (!user) {
      throw new Error("User does not exist");
    }

    return await prisma.mutation.deleteUser(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createPost(parent, args, { prisma }, info) {
    const { title, body, published, author } = args.data;

    return await prisma.mutation.createPost(
      {
        data: {
          title,
          body,
          published,
          author: {
            connect: {
              id: author,
            },
          },
        },
      },
      info
    );
  },
  async updatePost(parent, args, { prisma }, info) {
    const postexists = await prisma.exists.Post({ id: args.id });
    const { title, body, published } = args.data;

    if (!postexists) {
      throw new Error("No Post to Update");
    }
    return await prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: {
          title,
          body,
          published,
        },
      },
      info
    );
  },
  async deletePost(parent, args, { prisma }, info) {
    const verifyPost = await prisma.exists.Post({ id: args.id });
    if (!verifyPost) {
      throw new Error("No Post Found");
    }
    return await prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createComment(parent, args, { prisma }, info) {
    const { text, author, post } = args;
    return await prisma.mutation.createComment(
      {
        data: {
          text,
          author: {
            connect: {
              id: author,
            },
          },
          post: {
            connect: {
              id: post,
            },
          },
        },
      },
      info
    );
  },
  async deleteComment(parent, args, { prisma }, info) {
    const commentExists = await prisma.exists.Comment({ id: args.id });
    if (!commentExists) {
      throw new Error("No Comment Exists");
    }
    return await prisma.mutation.deleteComment(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updateComment(parent, args, { prisma }, info) {
    const commentExists = await prisma.exists.Comment({ id: args.id });
    if (!commentExists) {
      throw new Error("No Comment Exists");
    }
    return await prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: {
          text: args.data.text,
        },
      },
      info
    );
  },
};
export { Mutation as default };
