import { useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png"
import { Link, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { useContext } from "react";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({type}) => {
    
    const formRef = useRef(null);

    const { userAuth, setUserAuth } = useContext(UserContext);
    const access_token = userAuth?.access_token;

    console.log(access_token);

    const handleGoogleAuth = (e) => {
            e.preventDefault();

            authWithGoogle().then(user => {
                console.log(user);
                
            })
            .catch(err => {
                toast.error('trouble login wiht goolge');
                return console.log(err);
                
            })
    }
    

    const userAuthThroughServer = async (serverRoute, formData) => {

        try {
            const { data } = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData);
            //console.log(data);
            storeInSession("user", JSON.stringify(data));
            console.log(sessionStorage);
            return data;
        } catch ({ response }) {
            toast.error(response?.data?.error);
            throw response;
        }

    }

    const handleSubmit = (e) => {

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        e.preventDefault();

            let serverRoute = type == "Sign-in" ? "/signin" : "/signup";

            let form = new FormData(formRef.current);
            let formData = {};

            for (let [key, value] of form.entries()) {
                formData[key] = value;

                
            }

    let {fullname, email, password} = formData;
            

    if (type === "Sign-up") {
        if (!fullname || fullname.length < 3) {
    return toast.error("Fullname must be at least 3 letters long");
        }
    }

   if (!email.length) {

        return toast.error("Enter Email");
    
   }
   if (!emailRegex.test(email)) {
    
        return toast.error("Enter a valid Email"); 
   }
   if (password.length < 6) {

        return toast.error("Password must be at least 6 characters long");
   }
   if (!passwordRegex.test(password)) {

        return toast.error("Password should be minimum 6 characters long with a numeric, 1 lowercase and 1 uppercase letters"); 
    
   }

   userAuthThroughServer(serverRoute, formData)
  .then((data) => {
        setUserAuth(data);
        toast.success(data.success || `${type} Success`)
  })
  .catch((err) => {
    console.error("Auth failed:", err);    
    });

    }
    return (
        access_token ? 
        <Navigate to="/"/>
        :
        <AnimationWrapper keyValue={type}>
        <section className="text-center">
            <h1 className="text-center text-4xl md:text-5xl font-bold mb-4 py-10">Build Your Own Blog</h1>
            </section>
        <section className="h-screen flex items-center justify-center">
            <Toaster/>
            {type && (<form key={type} ref={formRef} onSubmit={handleSubmit} className="w-[80%] max-w-[400px]">
                <h1 className="text-center text-4xl md:text-5xl font-bold mb-10">
                    {type == "Sign-in" ? "Welcome Back" : "Join Us Today"}
                </h1>

                {
                    type == "Sign-up" ?
                    <>
                    <InputBox 
                        name="fullname"
                        type="text"
                        placeholder="FullName"
                        icon="fi-sr-user"
                    />

                    </>
                    

                    : ""

                }

                <InputBox 
                        name="email"
                        type="text"
                        placeholder="Email"
                        icon="fi-sr-circle-envelope"
                    />

                    <InputBox 
                        name="password"
                        type="password"
                        placeholder="Password"
                        icon="fi-sr-key"
                    />

                <button
                    className="btn-green text-white font-semibold px-5 py-2 rounded-full hover:bg-emerald-600 transition min-w-[100px] text-center center mt-14"
                    type="submit"
                    //onClick={handleSubmit}
                >
                    {type.replace("-", " ")}
                </button>

                <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-green font-bold">
                    <hr className="w-1/2 border-black" />
                    <p>or</p>
                    <hr className="w-1/2 border-black" />
                </div>
                    <button onClick={handleGoogleAuth} className="bg-black text-emerald-500 font-semibold px-5 py-2 rounded-full border border-emerald-500 hover:bg-emerald-50 transition flex items-center justify-center gap-4 w-[65%] center">
                            <img src={googleIcon} className="w-5" />
                            Continue With Google
                    </button>

                    {
                        type == "Sign-in" ?
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Don't have an account ?
                            <Link to="/signup" className="underline text-black text-xl ml-1">
                            Join us now!
                            </Link>
                        </p>
                        : <p className="mt-6 text-dark-grey text-xl text-center">
                            Already a member ?
                            <Link to="/signin" className="underline text-black text-xl ml-1">
                            Sign in here.
                            </Link>
                        </p>
                    }


            </form>)}

        </section>

        <footer className="bg-slate-800 text-white mt-24">
        <div className="container mx-auto px-6 py-8 text-center">
            <p>Created to help aspiring bloggers succeed.</p>
            <p className="text-sm text-slate-400 mt-2">BYOB Blogging Platform &copy; 2025</p>
        </div>
    </footer>
        
        </AnimationWrapper>
    )
}

export default UserAuthForm;