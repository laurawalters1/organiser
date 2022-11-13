import { gql } from "@apollo/client";
// sign up user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// sign up user
export const LOGIN_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// sign up user
export const ADD_TODO = gql`
  mutation addTodo($title: String!, $status: Boolean!, $description: String) {
    addTodo(title: $title, status: $status, description: $description) {
      username
      todos {
        title
        description
        status
      }
    }
  }
`;

// sign up user
export const COMPLETE_TODO = gql`
  mutation completeTodo($taskId: ID!) {
    completeTodo(taskId: $taskId) {
      username
      todos {
        title
        description
        status
        _id
      }
    }
  }
`;
