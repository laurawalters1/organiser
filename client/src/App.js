import logo from "./logo.svg";
import "./App.css";
// router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  HttpLink,
} from "@apollo/client";
import { Signup, Login, Home, Dashboard } from "./pages";
import Auth from "./utils/auth";
import Provisuo from "./assets/Provisuo.png";

// http link
// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

const link = new HttpLink({
  uri: "http://localhost:3001/graphql",
  // Additional options
});
// auth link
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // we are setting the header on every network request that we make to have the auth token that is available
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// new apollo client
const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="mt-5">
          <img src={Provisuo} alt="Provisuo" className="col-8 col-md-3" />
        </header>
        <Router>
          <Routes>
            <Route
              path="/"
              element={Auth.loggedIn() ? <Dashboard /> : <Home />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
