import { Typography, message } from "antd";

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "@api/auth/auth.api";
import { clearAuthenticate } from "@infrastructure/axios/auth";

interface ILogoutProps {
  readonly setAuth: (isAuth: boolean) => void;
}

const LogoutButton: React.FC<ILogoutProps> = ({ setAuth }) => {
  const navigate = useNavigate();

  const click = useCallback(async () => {
    clearAuthenticate();
    await authApi
      .logout()
      .then(() => {
        navigate("/", { replace: true });
        setAuth(false);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, [navigate, setAuth]);

  return (
    <Typography onClick={click} style={{ cursor: "pointer" }}>
      Выйти
    </Typography>
  );
};

export default LogoutButton;
