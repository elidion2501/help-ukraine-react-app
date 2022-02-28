import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/store/auth-slice";

const LogoutAction = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    dispatch(authActions.logout());
    history("/home");
  }, [dispatch, history]);

  return <div></div>;
};

export default LogoutAction;
