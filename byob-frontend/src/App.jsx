import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";

const App = () => {
    return (
        <>
        <Navbar/>
        <Routes>
            <Route path="/signin" element={<UserAuthForm type={"sign-in"}/>}/>
            <Route path="/signup" element={<UserAuthForm type={"sign-up"}/>}/>
        </Routes>
        </>
        
    );
};

export default App;