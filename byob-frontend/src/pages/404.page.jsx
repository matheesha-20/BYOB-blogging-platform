import pageNotFoundImg from "../imgs/404.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="bg-white h-cover relative  flex flex-col items-center gap-5 justify-center">
            <img className="select-none h-[500px] w-auto mx-auto" src={pageNotFoundImg} alt="404 - Page Not Found" />
            <h1 className="select-none text-4xl font-bold">404 - Page Not Found</h1>
            <p className="select-none p-2 text-center text-lg max-w-xl underline font-bold">
                <Link to="/">Go back to homepage</Link>
            </p>
            <span className="select-none text-5xl font-bold text-emerald-700 mt-12">-__BYOB__- </span>
            <p className="select-none p-1 text-center text-lg max-w-xl">
                Millions of blogs await you. Start exploring now!
            </p>
        </div>
    );
};
export default PageNotFound;