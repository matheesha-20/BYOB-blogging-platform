import pageNotFoundImg from "../imgs/404.png";
const PageNotFound = () => {
    return (
        <div className="h-cover relative p-10 flex flex-col items-center gap-10 justify-center">
            <img className="h-[500px] w-auto mx-auto" src={pageNotFoundImg} alt="404 - Page Not Found" />
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        </div>
    );
};
export default PageNotFound;