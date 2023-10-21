import { Route, Routes } from "react-router-dom";

import { Authorization } from "./pages/Authorization/Authorization";
import { Registration } from "./pages/Registration/Registration";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="registration" element={<Registration />} />
      <Route path="auth" element={<Authorization />} />
    </Routes>
  );
};

export default App;
