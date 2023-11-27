import { Route, Routes } from "react-router-dom";

import { Layout } from "@components/Layout/Layout";
import { RequireAuth } from "@hoc/RequireAuth";
import { Applicants } from "@pages/Applicants/Applicants";
import { Authorization } from "@pages/Authorization/Authorization";
import { Home } from "@pages/Home/Home";
import { MyProfile } from "@pages/MyProfile/MyProfile";
import { Registration } from "@pages/Registration/Registration";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }
        />
        <Route
          path="applicants"
          element={
            <RequireAuth>
              <Applicants />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="register" element={<Registration />} />
      <Route path="auth" element={<Authorization />} />
    </Routes>
  );
};

export default App;
