import React, { useEffect } from "react";
import { ConfigProvider, message } from "antd";
import { SWRConfig } from "swr";

import ApplicationRoutes from "./App/AdminPortal/config/Routes";
import usePersistentState from "./App/AdminPortal/hooks/usePersistentState";
import UserContext from "./App/AdminPortal/context/UserContext";
import { fetcher } from "./App/AdminPortal/utils/fetcher";
import { theme } from "./App/AdminPortal/utils/theme";
import initAxiosGlobalConfigs from "./App/AdminPortal/config/axios.Config";

const App = () => {
  const [auth, setAuth] = usePersistentState("auth", {
    initialValue: {},
  });

  initAxiosGlobalConfigs(auth?.token);

  useEffect(() => {
    if (auth?.data && auth?.token) {
      // set token from local storage
      initAxiosGlobalConfigs(auth?.token);
    }
  }, [auth]);

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (error, key) => {
          if (error) {
            // TODO:  Add Proper error handling in this middleware
            message.error("Internal server Error!", error);
          }
        },
      }}
    >
      <UserContext.Provider value={{ auth, setAuth }}>
        <ConfigProvider theme={theme}>
          <ApplicationRoutes />
        </ConfigProvider>
      </UserContext.Provider>
    </SWRConfig>
  );
};

export default App;
