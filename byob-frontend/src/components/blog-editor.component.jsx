import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";

const BlogEditor = () => {
    const handleBannerUpload = (e) => {
        console.log(e);
        let img = e.target.files[0];
        console.log(img);
        
        
    }
    return (
        <><header id="header" className="text-xl font-bold text-emerald-700 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-emerald-700"><h1>-__BYOB__-</h1></a>

                <div className="flex space-x-6 items-center">
                    {/* <a href="/home" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Home</a>
                    <a href="/editor" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Write</a>
                    <a href="#trending" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Dashboard</a>
                    <a href="#profile" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Trending</a> */}
                    <Link to="/signup">
                                            <button className="hidden md:block bg-emerald-600 text-white font-semibold px-5 py-1 rounded-full hover:bg-emerald-600 transition min-w-[100px] text-center">
                                                Publish
                                            </button>
                    </Link>
                    <Link to="/signin">
                                        <button className="bg-white text-emerald-500 font-semibold px-5 py-1 rounded-full border border-emerald-600 hover:bg-emerald-50 transition min-w-[100px] text-center">
                                            Save Draft
                                        </button>
                    </Link>
                </div>
            </nav>
        </header>
        <body>
            <AnimationWrapper>
                <h1 className="text-center text-4xl md:text-5xl font-bold mb-4 py-10">Build Your Own Blog</h1>
            <section>
                <div className="mx-auto max-w-[900px] w-full">

                    <div className="relative aspect-video opacity-70 hover:opacity-80 bg-white border-4 border-green-800">
                        <label htmlFor="uploadBanner">
                            <img src={defaultBanner} 
                                 className="z-20" />
                            <input  id="uploadBanner" 
                                    type="file" 
                                    accept=".png, .jpg, .jpeg" 
                                    hidden
                                    onChange={handleBannerUpload}/>
                        </label>
                    </div>

                </div>
            </section>

            </AnimationWrapper>
            
        </body>
        </>
    )
}

export default BlogEditor;