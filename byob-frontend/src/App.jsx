import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookINSession } from "./common/session";
import { useLocation } from "react-router-dom";


export const UserContext = createContext({})

const App = () => {
  const [userAuth, setUserAuth] = useState({});
  const location = useLocation();

  useEffect(() => {
    let userInSession = lookINSession("user");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  const hideNavbarRoutes = ["/editor"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/editor" element={<h1>hi</h1>} />
      </Routes>

      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/signin" element={<UserAuthForm key="signin" type="Sign-in" />} />
        <Route path="/signup" element={<UserAuthForm key="signup" type="Sign-up" />} />
        <Route path="/home" element={<h1>Home</h1>} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;