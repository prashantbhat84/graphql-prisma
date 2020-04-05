import { v4 as uuidv4 } from "uuid";
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) {
      throw new Error("Email Taken");
    }
    return await prisma.mutation.createUser({ data: args.data }, info);
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
  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const userexists = db.posts.find((post) => post.id === id);
    const originalPost = { ...userexists };

    if (!userexists) {
      throw new Error("No post found");
    }
    if (typeof data.title === "string") {
      userexists.title = data.title;
    }
    if (typeof data.body === "string") {
      userexists.body = data.body;
    }
    if (typeof data.published === "boolean") {
      userexists.published = data.published;
    }
    if (originalPost.published && !userexists.published) {
      //deleted
      pubsub.publish("post", {
        post: {
          mutation: "DELETED",
          data: originalPost,
        },
      });
    } else if (!originalPost.published && userexists.published) {
      //created
      pubsub.publish("post", {
        post: {
          mutation: "CREATED",
          data: userexists,
        },
      });
    } else if (userexists.published) {
      //updated
      pubsub.publish("post", {
        post: {
          mutation: "UPDATED",
          data: userexists,
        },
      });
    }

    return userexists;
  },
  deletePost(parent, args, { db, pubsub }, info) {
    const verifyPost = db.posts.findIndex((post) => post.id === args.id);
    if (verifyPost === -1) {
      throw new Error("No Post exists");
    }

    const [deletedPost] = db.posts.splice(verifyPost, 1);

    db.comments = db.comments.filter((comment) => comment.post !== args.id);
    if (deletedPost.published) {
      pubsub.publish("post", {
        post: {
          mutation: "DELETED",
          data: deletedPost,
        },
      });
    }

    return deletedPost;
  },
  createComment(parent, args, { db, pubsub }, info) {
    const { text, author, post } = args;
    const userExists = db.users.some((user) => user.id === author);
    const postexists = db.posts.some(
      (post1) => post1.published === true && post1.id === post
    );

    if (!userExists || !postexists) {
      throw new Error("Post/User does not exist");
    }
    const comment = {
      id: uuidv4(),
      ...args,
    };
    db.comments.push(comment);
    pubsub.publish(`comment ${post}`, {
      comment: {
        mutation: "CREATED",
        data: comment,
      },
    });

    return comment;
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const verifyComment = db.comments.findIndex(
      (comment) => comment.id === args.id
    );
    if (verifyComment === -1) {
      throw new Error("Comment does not exist");
    }
    const [deletedComment] = db.comments.splice(verifyComment, 1);

    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: "DELETED",
        data: deletedComment,
      },
    });

    return deletedComment;
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const verifyComment = db.comments.find((comment) => comment.id === id);
    if (!verifyComment) {
      throw new Error("Comment does not exist");
    }

    if (typeof data.text === "string") {
      verifyComment.text = data.text;
    }
    pubsub.publish(`comment ${verifyComment.post}`, {
      comment: {
        mutation: "UPDATED",
        data: verifyComment,
      },
    });
    return verifyComment;
  },
};
export { Mutation as default };
