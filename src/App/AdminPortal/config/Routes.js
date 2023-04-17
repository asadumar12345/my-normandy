// libs
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import UserContext from "../context/UserContext";
import { routes } from "../utils/constants";

import Login from "../features/Login";
import Home from "../features/Home";
import ReviewRequests from "../features/ReviewRequests";
import PageNotFound from "../features/PageNotFound";
import RewardInventory from "../features/RewardInventory";
import Category from "../features/Category";
import ManageAgent from "../features/ManageAgent";
import AgentProfile from "../features/ManageAgent/agentProfile";
import AddNewReward from "../features/RewardInventory/AddNewReward";

function RequireAuth({ children }) {
  const { auth } = useContext(UserContext);
  let location = useLocation();
  if (auth?.token) {
    return <>{children}</>;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}

const ApplicationRoutes = () => {
  const { auth, setAuth } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={routes.REWARDINVENTORY} replace />}
        />
        <Route
          path="/login"
          element={<Login auth={auth} setAuth={setAuth} />}
        />
        <Route
          path={routes.REWARDINVENTORY}
          element={
            <RequireAuth>
              <RewardInventory />
            </RequireAuth>
          }
        />
        <Route
          path={`${routes.REWARDINVENTORY}/:id`}
          element={
            <RequireAuth>
              <AddNewReward />
            </RequireAuth>
          }
        />
        <Route
          path={routes.REVIEWREQUESTS}
          element={
            <RequireAuth>
              <ReviewRequests />
            </RequireAuth>
          }
        />
        <Route
          path={routes.CATEGORY}
          element={
            <RequireAuth>
              <Category />
            </RequireAuth>
          }
        />
        <Route
          path={routes.MANAGEAGENT}
          element={
            <RequireAuth>
              <ManageAgent />
            </RequireAuth>
          }
        />
        <Route
          path={`${routes.MANAGEAGENT}/agent-profile/:id`}
          element={
            <RequireAuth>
              <AgentProfile />
            </RequireAuth>
          }
        />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
};
export default ApplicationRoutes;
