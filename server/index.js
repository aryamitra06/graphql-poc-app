const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// GraphQL server setup
async function startServer() {
  const server = new ApolloServer({
    typeDefs: `
      type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        phone: String!
        website: String!
      }
      type Todo {
        id: ID!
        title: String!
        completed: Boolean!
        userId: ID!
        user: User
      }
      type Query {
        getAllTodos: [Todo]
        getAllUsers: [User]
        getUserById(id: ID!): User
      }
    `,
    resolvers: {
      Todo: {
        // Resolver for the 'user' field of 'Todo'
        //parameter "todo" is parent object
        user: async (todo) => {
          try {
            if (!todo.userId) {
              console.error("userId is missing in the Todo object:", todo);
              return null;
            }
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.userId}`
            );
            return response.data;
          } catch (error) {
            console.error(
              `Error fetching user for userId ${todo.userId}:`,
              error.message
            );
            return null; // Return null if the user can't be fetched
          }
        },
      },
      Query: {
        getAllTodos: async () => {
          try {
            const response = await axios.get(
              "https://jsonplaceholder.typicode.com/todos"
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching todos:", error.message);
            return [];
          }
        },
        getAllUsers: async () => {
          try {
            const response = await axios.get(
              "https://jsonplaceholder.typicode.com/users"
            );
            return response.data;
          } catch (error) {
            console.error("Error fetching users:", error.message);
            return [];
          }
        },
        getUserById: async (parent, { id }) => {
          try {
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/users/${id}`
            );
            return response.data;
          } catch (error) {
            console.error(`Error fetching user with id ${id}:`, error.message);
            return null;
          }
        },
      },
    },
  });

  await server.start();
  app.use("/graphql", expressMiddleware(server));
}

// Listen on port 8000
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

startServer();