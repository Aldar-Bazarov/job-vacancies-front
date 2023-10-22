import { Route, Routes } from "react-router-dom";

import { RequireAuth } from "@hoc/RequireAuth";
import { Authorization } from "@pages/Authorization/Authorization";
import { Home } from "@pages/Home/Home";
import { Registration } from "@pages/Registration/Registration";
import { UserInfo } from "@pages/UserInfo/UserInfo";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="registration" element={<Registration />} />
      <Route path="auth" element={<Authorization />} />
      <Route
        path="user"
        element={
          <RequireAuth>
            <UserInfo />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
