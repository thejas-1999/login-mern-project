import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Import all the components */
import Username from "./components/UserName";
import Password from "./components/Password";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Recovery from "./components/Recovery";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Username />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password" element={<Password />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
