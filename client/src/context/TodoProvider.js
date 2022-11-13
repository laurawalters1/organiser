import React, { createContext, useContext, useState, useEffect } from "react";
// get user information
import { GET_ME } from "../utils/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import Auth from "../utils/auth";

// create chat context
const TodoContext = createContext();

// create chat provider
const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const [getMe, { loading, data, error }] = useLazyQuery(GET_ME);

  const userData = data?.me || [];

  const getTodos = async () => {
    const { data, loading, error } = await getMe();
    setTodos([...data.me.todos]);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    // return chat provider
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// export chat context
export const TodoState = () => {
  return useContext(TodoContext);
};

export default TodoProvider;
