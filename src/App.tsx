/* eslint-disable */
import { Route, Routes } from "react-router-dom";

import { Authorization } from "@pages/Authorization/Authorization";
import { Layout } from "@components/Layout/Layout";
import { Vacancies } from "@components/Vacancies/Vacancies";
import { Vacancy } from "@components/Vacancy/Vacancy";
import { RequireAuth } from "@hoc/RequireAuth";
import { Applicants } from "@pages/Applicants/Applicants";
import { Companies } from "@pages/Companies/Companies";
import { Company } from "@pages/Company/Company";
import { CreateResume } from "@pages/CreateResume/CreateResume";
import { Home } from "@pages/Home/Home";
import { NotFound } from "@pages/NotFound/NotFound";
import { Profile } from "@pages/Profile/Profile";
import { Registration } from "@pages/Registration/Registration";
import { Resume } from "@pages/Resume/Resume";
import { CreateVacancy } from "@components/CreateVacancy/CreateVacancy";
import { Resumes } from "@pages/Resumes/Resumes";

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
            <RequireAuth>
              <Applicants />
            </RequireAuth>
          }
        />
        <Route path="vacancies" element={<Vacancies />} />
        <Route path="vacancies/:vacancyId" element={<Vacancy />} />
        <Route path="companies" element={<Companies />} />
        <Route
          path="create-vacancy"
          element={
            <RequireAuth>
              <CreateVacancy />
            </RequireAuth>
          }
        />
        <Route
          path="resume/create"
          element={
            <RequireAuth>
              <CreateResume />
            </RequireAuth>
          }
        />
        <Route
          path="resumes"
          element={
            <RequireAuth>
              <Resumes />
            </RequireAuth>
          }
        />
        <Route
          path="resume/:resumeId"
          element={
            <RequireAuth>
              <Resume />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="register" element={<Registration />} />
      <Route path="auth" element={<Authorization />} />
    </Routes>
  );
};

export default App;
