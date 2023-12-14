import { Route, Routes } from "react-router-dom";

import { CreateVacancy } from "@components/CreateVacancy/CreateVacancy";
import { Layout } from "@components/Layout/Layout";
import { Vacancies } from "@components/Vacancies/Vacancies";
import { Vacancy } from "@components/Vacancy/Vacancy";
import { RequireAuth } from "@hoc/RequireAuth";
import { Applicants } from "@pages/Applicants/Applicants";
import { Authorization } from "@pages/Authorization/Authorization";
import { Companies } from "@pages/Companies/Companies";
import { Company } from "@pages/Company/Company";
import { Home } from "@pages/Home/Home";
import { NotFound } from "@pages/NotFound/NotFound";
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
          path="company/create"
          element={
            <RequireAuth>
              <Company />
            </RequireAuth>
          }
        />
        <Route
          path="applicants"
          element={
            // <RequireAuth>
            <Applicants />
            // </RequireAuth>
          }
        />
        <Route path="vacancies" element={<Vacancies />} />
        <Route path="vacancies/:vacancyId" element={<Vacancy />} />
        <Route path="companies" element={<Companies />} />
        <Route path="create-vacancy" element={<CreateVacancy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="register" element={<Registration />} />
      <Route path="auth" element={<Authorization />} />
    </Routes>
  );
};

export default App;
