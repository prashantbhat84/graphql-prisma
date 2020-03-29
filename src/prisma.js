import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});
//prisma.qery  prisma,mutation prisma.sub  prisma.exists

// prisma.query.users(null, "{id name posts {id title}}").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });
// prisma.query
//   .comments(null, "{id text author{id name} post{ id title}}")
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 4));
//   });
// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "101 graphql",
//         body: "",
//         published: false,
//         author: {
//           connect: {
//             id: "ck8btkasj00fg070383qxke4v"
//           }
//         }
//       }
//     },
//     "{id title body published}"
//   )
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//     return prisma.query.users(null, "{id name posts {id title}}").then(data => {
//       console.log(JSON.stringify(data, undefined, 2));
//     });
//   });
// prisma.query
//   .posts(null, "{id title body published author {id name email}}")
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 4));
//     console.log(data.length);
//   });
prisma.mutation
  .updatePost(
    {
      where: {
        id: "ck8cs28wu003i070337n662qb"
      },
      data: {
        body: "This is a new course",
        published: true
      }
    },
    "{id title body published}"
  )
  .then(data => {
    console.log(data);
    prisma.query
      .posts(null, "{id title body published author{ id name email}}")
      .then(data => {
        console.log(JSON.stringify(data, undefined, 4));
      });
  });
