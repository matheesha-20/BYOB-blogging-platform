import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookINSession } from "./common/session";
import { useLocation } from "react-router-dom";
import Editor from "./pages/editor.pages";
import Home from "./pages/home.page";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";


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
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/signin" element={<UserAuthForm key="signin" type="Sign-in" />} />
        <Route path="/signup" element={<UserAuthForm key="signup" type="Sign-up" />} />
        <Route path="search/:query" element={<SearchPage />} />
        <Route index element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;