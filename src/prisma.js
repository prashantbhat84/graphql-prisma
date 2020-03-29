import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});
//prisma.qery  prisma,mutation prisma.sub  prisma.exists

const createPostForUser = async (authorid, data) => {
  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,

        author: {
          connect: {
            id: authorid
          }
        }
      }
    },
    "{id }"
  );
  const user = await prisma.query.user(
    {
      where: {
        id: authorid
      }
    },
    "{name email posts{id title published}}"
  );

  return user;
};
// createPostForUser("ck8bu15j000id0703776wfjq3", {
//   title: "My third post",
//   body: "My  post body",
//   published: true
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// });

const updateUserPost = async (postid, data) => {
  const updatePost = await prisma.mutation.updatePost(
    {
      where: {
        id: postid
      },
      data: {
        ...data
      }
    },
    "{id author{id} }"
  );
  console.log(updatePost.author.id);
  const user = await prisma.query.user(
    {
      where: {
        id: updatePost.author.id
      }
    },
    "{id name email posts {id title  body published}}"
  );

  return user;
};
// updateUserPost("ck8bv0ap400pa0703wdm4barl", {
//   body: "Updated new post1",
//   published: false
// }).then(post => {
//   console.log(JSON.stringify(post, undefined, 2));
// });
