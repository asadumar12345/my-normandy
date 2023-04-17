// libs
import { createContext } from "react";

// user context
const UserContext = createContext({
  auth: {},
  setAuth: () => {},
});

export default UserContext;