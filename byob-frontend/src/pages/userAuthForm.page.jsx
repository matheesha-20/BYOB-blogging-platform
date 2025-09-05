import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png"
import { Link } from "react-router-dom";

const UserAuthForm = ({type}) => {
    return (
        <AnimationWrapper keyValue={type}>
        <section className="text-center">
            <h1 className="text-center text-4xl md:text-5xl font-bold mb-4 py-10">Build Your Own Blog</h1>
            </section>
        <section className="h-screen flex items-center justify-center">
            <form className="w-[80%] max-w-[400px]">
                <h1 className="text-center text-4xl md:text-5xl font-bold mb-10">
                    {type == "Sign-in" ? "Welcome Back" : "Join Us Today"}
                </h1>

                {
                    type == "Sign-up" ?
                    <>
                    <InputBox 
                        name="full name"
                        type="text"
                        placeholder="Full Name"
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
                >
                    {type.replace("-", " ")}
                </button>

                <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-green font-bold">
                    <hr className="w-1/2 border-black" />
                    <p>or</p>
                    <hr className="w-1/2 border-black" />
                </div>
                    <button className="bg-black text-emerald-500 font-semibold px-5 py-2 rounded-full border border-emerald-500 hover:bg-emerald-50 transition flex items-center justify-center gap-4 w-[65%] center">
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


            </form>

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