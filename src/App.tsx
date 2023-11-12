import { Route, Routes } from "react-router-dom";

import { Layout } from "@components/Layout/Layout";
import { RequireAuth } from "@hoc/RequireAuth";
import { Authorization } from "@pages/Authorization/Authorization";
import { Home } from "@pages/Home/Home";
import { Profile } from "@pages/Profile/Profile";
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
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="profile/:profileId" element={<Profile />} />
      </Route>
      <Route path="register" element={<Registration />} />
      <Route path="auth" element={<Authorization />} />
    </Routes>
  );
};

export default App;
