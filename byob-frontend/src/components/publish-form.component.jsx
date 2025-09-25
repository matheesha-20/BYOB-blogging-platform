import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";

const PublishForm = () => {

    let characterLimit = 200;

    let { blog, blog: {banner, title, tags, description, content}, setEditorState, setBlog } = useContext(EditorContext);

    const handleCloseEvent = () => {
        setEditorState("editor")

    }

    const handletitlechage = (e) =>{
        let input = e.target;

        setBlog({ ...blog, title: input.value })
    }

    const handledeschange = (e) =>{
        let input = e.target;

        setBlog({ ...blog, description: input.value })
    }

    const handleDesKeyDown = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
        }

    }

    return (
        <AnimationWrapper>
            <section className=" w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">

                <Toaster/>

                <button className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
                onClick={handleCloseEvent}>
                    <i className="fi fi-br-x"></i>
                </button>

                <div className="max-w-[500px]">
                    <p className="text-center text-4xl md:text-5xl font-bold mb-4 py-5">Preview</p>

                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-white mt-4 border-4 border-emerald-500">
                        <img src={banner} />
                    </div>
                    <h1 className="text-left text-4xl md:text-5xl font-bold mb-4 py-10 mt-2 leading-tight line-clamp-2">
                         {title} 
                    </h1>
                    <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
                        {description}
                    </p>

                </div>

                <div className="container mt-5">

                    <div className="vertical-line hidden md:block"></div>
                    
                    <div className="border-dark-grey lg:border-1 lg:pl-10 text-2xl text-bold mt-12">

                    <p className="mb-5 pr-4 py-2  text-emerald-500 placeholder-emerald-500 hover:placeholder-slate-500 hover:text-slate-500 focus:text-slate-500 transition duration-300">
                        Blog Title -
                    </p>

                    <input className="mb-5 pl-10 pr-4 py-2  text-slate-500 input-box" type="text" placeholder="Blog Title" 
                    defaultValue={title} onChange={handletitlechage}/>

                    <p className="mb-5 pr-4 py-2  text-emerald-500 placeholder-emerald-500 hover:placeholder-slate-500 hover:text-slate-500 focus:text-slate-500 transition duration-300">
                        Description of Blog -
                    </p>

                    <textarea maxLength={characterLimit}
                    defaultValue={description}
                    className="h-40  resize-none leading-7 input-box pl-4"
                    onChange={handledeschange}
                    onKeyDown={handleDesKeyDown}
                    >

                    </textarea>

                    <p className="mt-1 text-dark-grey text-sm text-right">{characterLimit - (description?.length || 0)} characters left</p>

                    <p className="mb-5 pr-4 py-2  text-emerald-500 placeholder-emerald-500 hover:placeholder-slate-500 hover:text-slate-500 focus:text-slate-500 transition duration-300">
                        Tags -
                    </p>

                    <div className="relative input-box pl-2 py-2 pb-4">
                        

                    </div>
                    
                    <p className="mt-1 text-dark-grey text-sm text-left"> ( Helps for searching and ranking your blog post) </p>
                    
                </div>
                </div>

                

            </section>
        </AnimationWrapper>
    )
}

export default PublishForm;