import { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";




const Tags = ({ tag }) => {

let { blog, blog: { tags }, setBlog } = useContext(EditorContext);


const handleTagDelete = () => {

    tags = tags.filter(t => t !== tag);
    setBlog({ ...blog, tags: tags})

}


    return (
        <div className="relative p-1  mt-1 mr-1 pl-4 mb-1 px-1 rounded-full inline-block bg-slate-800  hover:bg-opacity-90 pr-10">
            <p className="outline-none" contentEditable="true">{tag}</p>
            <button className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={handleTagDelete}
            >
                <i className="fi fi-br-x text-sm pointer-event-none"></i>
            </button>
        </div>
    );
};

export default Tags;