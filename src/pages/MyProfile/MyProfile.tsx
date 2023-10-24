/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "antd";

import { useEffect, useState } from "react";

import { getMyProfile } from "@api/user/user.api";
import { Role } from "@interfaces/user";

export const MyProfile = () => {
  const [profileData, setProfileData] = useState<any>();
  useEffect(() => {
    getMyProfile({ role: Role.Applicants }).then((data) => {
      setProfileData(data);
    });
  }, []);

  return (
    <div>
      <Typography>Тут будет информация о пользователе</Typography>
      {profileData?.user?.email}
    </div>
  );
};
