import React from 'react'
import { useQuery, gql } from '@apollo/client';

const query = gql`
query GetAllTodos {
  getAllTodos {
    title
    id
    user {
      name
    }
  }
}
`;

export default function App() {

  const { loading, error, data } = useQuery(query);
  

  return (
    <div>
      <h2>Users List</h2>
      {
        loading && <p>Loading...</p>
      }
      {
        error && <p>Error: {error.message}</p>
      }
      <ul>
        {data?.getAllTodos?.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>Name: {todo.user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
