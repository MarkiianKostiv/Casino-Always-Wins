import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { getUserDataRequest } from "../state/user/userSlice";
import { LoadingScreen } from "./ui/LoadingScreen";
import { userGamesRequest } from "../state/games/slicers/user_games_statistic/gamesUserSlice";

const PrivateRoute: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const visitToken = localStorage.getItem("visit_token");
  const { user, loading } = useSelector((state: RootState) => state.user);
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!visitToken) {
    return (
      <Navigate
        to='/about_us'
        replace
      />
    );
  }

  if (!token) {
    return (
      <Navigate
        to='/sign-up'
        replace
      />
    );
  }

  useEffect(() => {
    dispatch(getUserDataRequest());
  }, [dispatch]);

  useEffect(() => {
    if (user && accessToken && refreshToken) {
      dispatch(userGamesRequest(user?.id));
    }
  }, [user, dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <Outlet />;
};

export default PrivateRoute;
