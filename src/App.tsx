import { Route, Routes } from "react-router-dom";

import { Registration } from "./pages/Registration/Registration";
import { Authorization } from "./pages/Authorization/Authorization";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="registration" element={<Registration />} />
      <Route path="auth" element={<Authorization />} />
    </Routes>
  );
};

export default App;
