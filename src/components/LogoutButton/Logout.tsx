import { Button, message } from "antd";

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "@api/auth/auth.api";
import { ClearAuthenticate } from "@infrastructure/axios/auth";

const Logout: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const click = useCallback(async () => {
    await logout()
      .then(() => {
        ClearAuthenticate();
        navigate("/", { replace: true });
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, [navigate]);

  return (
    <Button onClick={click} type="link">
      Выйти
    </Button>
  );
};

export default Logout;
