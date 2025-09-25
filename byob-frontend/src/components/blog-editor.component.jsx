import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import { uploadImg } from "../common/aws";
import { useContext, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";

const BlogEditor = () => {

    let {blog, blog:{ title, banner, content, tags, des}, setBlog, textEditor, setTextEditor, setEditorState} = useContext(EditorContext)

    useEffect(() => {
        setTextEditor(new EditorJS({
            holderId: "blogwriter",
            data: content,
            tools: tools,
            placeholder: "Let's write Your Awesome Blog!"
        }))
    }, [])

    const handleBannerUpload = (e) => {
        e.preventDefault();
        let img = e.target.files[0];
        if (img) {

            let loadingToast = toast.loading("Uploading...")
            uploadImg(img)
            .then((url) => {
                if (url) {
                    toast.dismiss(loadingToast);
                    toast.success("Uploaded 👍");

                    setBlog({ ...blog, banner: url});

                }
            })
            .catch(err => {
                toast.dismiss(loadingToast);
                return toast.error(err);
            })
        }
        
    }

    const handleTitleKeyDown = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
        }

    }

    const handleTitleChange = (e) => {
        let input = e.target;

        input.style.height = 'auto';
        input.style.height = input.scrollHeight +"px";

        setBlog({ ...blog, title: input.value })
    }

    const handleError = (e) => {
        let img = e.target;

        img.src = defaultBanner;
    }

    const handlePublishEvent = () => {
        if (!banner.length) {
            return toast.error("Upload a blog banner to publish!");
        }
        if (!title.length) {
            return toast.error("Add a title before publish!");
        }
        if (textEditor.isReady) {
            textEditor.save()
            .then((outputData) => {
                if (outputData.blocks.length) {
                    setBlog({ ...blog, content: outputData })
                    setEditorState("publish")
                }
                else{
                    return toast.error("Write something in your blog before publish!")
                }
            })
            .catch((error) => {
                console.log("Saving failed: ", error) });
        }
    }

    return (
        <><header id="header" className="text-xl font-bold text-emerald-700 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-emerald-700"><h1>-__BYOB__-</h1></a>

                <p className="text-center text-2xl font-bold text-emerald-700">_{ title .length ? title : "New Blog"}_</p>
                

                <div className="flex space-x-6 items-center">
                    {/* <a href="/home" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Home</a>
                    <a href="/editor" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Write</a>
                    <a href="#trending" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Dashboard</a>
                    <a href="#profile" className="hidden md:block text-xl text-slate-600 hover:text-emerald-600 transition">Trending</a> */}
                    
                    <Link to="">
                                            <button className="bg-emerald-600 text-white font-semibold px-5 py-1 rounded-full hover:bg-emerald-600 transition min-w-[100px] text-center"
                                                    onClick={handlePublishEvent}>
                                                Publish
                                            </button>
                    </Link>
                    <Link to="">
                                        <button className="bg-white text-emerald-500 font-semibold px-5 py-1 rounded-full border border-emerald-600 hover:bg-emerald-50 transition min-w-[100px] text-center">
                                            Save Draft
                                        </button>
                    </Link>
                </div>
            </nav>
        </header>
        <body>
            <Toaster/>
            <AnimationWrapper>
                <h1 className="text-center text-4xl md:text-5xl font-bold mb-4 py-10">Build Your Own Blog</h1>
            <section>
                <div className="mx-auto max-w-[900px] w-full">

                    <div className="relative aspect-video hover:opacity-80 bg-white border-4">
                        <label htmlFor="uploadBanner">
                            <img 
                                 src={banner}
                                 className="z-20"
                                 onError={handleError} />
                            <input  id="uploadBanner" 
                                    type="file" 
                                    accept=".png, .jpg, .jpeg" 
                                    hidden
                                    onChange={handleBannerUpload}
                                    />
                        </label>
                    </div>
                    <br />

                    <textarea 
                              defaultValue={title}
                              placeholder="Blog Title"
                              className="bg-stone-100 text-3xl md:text-5xl font-bold mb-4 py-10 outline-none resize-none mt-10 leading-tight placeholder:opacity-50"
                              onKeyDown={handleTitleKeyDown}
                              onChange={handleTitleChange}
                    >

                    </textarea>

                    <hr className="w-full opacity-10 my-5" />

                    <div id="blogwriter" className="font-gelasio text-2xl">
                    </div>

                </div>
            </section>

            </AnimationWrapper>
            
        </body>
        </>
    )
}

export default BlogEditor;