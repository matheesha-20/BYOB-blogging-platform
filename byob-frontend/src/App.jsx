import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookINSession } from "./common/session";

export const UserContext = createContext({})

const App = () => {

    const [ userAuth, setUserAuth] =  useState({});

    useEffect(() => {
        let userInSession = lookINSession("user");

        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null})
    }, [])

    return (
        <UserContext.Provider value={{userAuth, setUserAuth}}>
        <Navbar/>
        <Routes>
            <Route path="/signin" element={<UserAuthForm key="signin" type={"Sign-in"}/>}/>
            <Route path="/signup" element={<UserAuthForm key="signup" type={"Sign-up"}/>}/>
        </Routes>
        </UserContext.Provider>
        
    );
};

export default App;