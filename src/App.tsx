import { Route, Routes } from "react-router-dom";

import { Layout } from "@components/Layout/Layout";
import { Vacancies } from "@components/Vacancies/Vacancies";
import { RequireAuth } from "@hoc/RequireAuth";
import { Applicants } from "@pages/Applicants/Applicants";
import { Authorization } from "@pages/Authorization/Authorization";
import { Companies } from "@pages/Companies/Companies";
import { Company } from "@pages/Company/Company";
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
        <Route path="company/:companyId" element={<Company />} />
        <Route
          path="applicants"
          element={
            // <RequireAuth>
            <Applicants />
            // </RequireAuth>
          }
        />
        <Route path="vacancies" element={<Vacancies />} />
        <Route path="companies" element={<Companies />} />
      </Route>
      <Route path="register" element={<Registration />} />
      <Route path="auth" element={<Authorization />} />
    </Routes>
  );
};

export default App;
