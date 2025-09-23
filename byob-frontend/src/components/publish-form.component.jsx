import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";

const PublishForm = () => {

    let { blog: {banner, title, tags, description, content}, setEditorState } = useContext(EditorContext);

    const handleCloseEvent = () => {
        setEditorState("editor")

    }

    return (
        <AnimationWrapper>
            <section className="bg-stone-200 w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">

                <Toaster/>

                <button className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
                onClick={handleCloseEvent}>
                    <i className="fi fi-br-x"></i>
                </button>

                <div className="max-w[500px]">
                    <p className="text-center text-4xl md:text-5xl font-bold mb-4 py-5">Preview</p>

                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-white mt-4">
                        <img src={banner} />
                    </div>
                    <h1 className="text-left text-4xl md:text-5xl font-bold mb-4 py-10 mt-2 leading-tight line-clamp-2"> {title} </h1>
                </div>

                <div className="container mt-5">

                    <div className="vertical-line hidden md:block"></div>
                    
                    <div className="border-dark-grey lg:border-1 lg:pl-10 text-2xl text-bold mt-12">

                    <p>
                        Blog Title - 
                    </p>

                    <input className="mb-5 pl-10 pr-4 py-2 bg-transparent text-emerald-500 placeholder-emerald-500 hover:placeholder-slate-500 hover:text-slate-500 focus:text-slate-500 transition duration-300" type="text" placeholder="Blog Title" 
                    defaultValue={title}/>

                    <p className="">
                        Description - 
                    </p>

                    <input className="mb-5 pl-10 pr-4 py-2 bg-transparent text-emerald-500 placeholder-emerald-500 hover:placeholder-slate-500 hover:text-slate-500 focus:text-slate-500 transition duration-300" type="text" placeholder="Blog Title" 
                    defaultValue={title}/>
                    
                    
                </div>
                </div>

                

            </section>
        </AnimationWrapper>
    )
}

export default PublishForm;