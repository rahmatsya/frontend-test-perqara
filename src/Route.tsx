import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import List from "./pages/List";
import Detail from "./pages/Detail";

function AppRoute() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoute;
