import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
  secret: "AndrewMeadPrashantUdemy@1234567890",
});
export { prisma as default };
//prisma.qery  prisma,mutation prisma.sub  prisma.exists

// const createPostForUser = async (authorid, data) => {
//   const verify = await prisma.exists.User({ id: authorid });
//   if (!verify) {
//     throw new Error("No User is found ");
//   }
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,

//         author: {
//           connect: {
//             id: authorid
//           }
//         }
//       }
//     },
//     "{author{  id name email posts{id title published}} }"
//   );

//   return post;
// };
// createPostForUser("ck8btkasj00fg070383qxke4v", {
//   title: "My New Post",
//   body: "My   body",
//   published: true
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(e => {
//     console.log(e.message);
//   });

// const updateUserPost = async (postid, data) => {
//   const verifyPost = await prisma.exists.Post({ id: postid });
//   if (!verifyPost) {
//     throw new Error("Post does not exist");
//   }
//   const updatePost = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postid
//       },
//       data: {
//         ...data
//       }
//     },
//     "{author { id name email}  }"
//   );
//   console.log(updatePost.author.id);

//   return updatePost.author;
// };
// updateUserPost("ck8crsktr00320703bc4zufh8", {
//   body: "New Graphql Post3",
//   published: true
// })
//   .then(post => {
//     console.log(JSON.stringify(post, undefined, 2));
//   })
//   .catch(e => {
//     console.log(e.message);
//   });
