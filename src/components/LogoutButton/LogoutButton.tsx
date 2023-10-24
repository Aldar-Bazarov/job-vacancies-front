import { Button, message } from "antd";

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "@api/auth/auth.api";
import { clearAuthenticate } from "@infrastructure/axios/auth";

const LogoutButton: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const click = useCallback(async () => {
    clearAuthenticate();
    await logout()
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, [navigate]);

  return (
    <Button onClick={click} type="primary">
      Выйти
    </Button>
  );
};

export default LogoutButton;
