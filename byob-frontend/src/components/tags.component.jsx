import { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";




const Tags = ({ tag, tagIndex }) => {

let { blog, blog: { tags }, setBlog } = useContext(EditorContext);


const handleTagDelete = () => {

    tags = tags.filter(t => t !== tag);
    setBlog({ ...blog, tags: tags});

}

const handleTagEdit = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
        
        e.preventDefault();

        let currentTag = e.target.innerText;

        tags[tagIndex] = currentTag;

        setBlog({ ...blog, tags });

        e.target.setAttribute("contentEditable", false)

    }

}

const addEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
}


    return (
        <div className="relative p-1  mt-1 mr-1 pl-4 mb-1 px-1 rounded-full inline-block bg-slate-300 text-emerald-800 text-bold hover:bg-opacity-90 pr-10">
            <p className="outline-none" onKeyDown={handleTagEdit} onClick={addEditable}>{tag}</p>
            <button className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={handleTagDelete}
            >
                <i className="fi fi-br-x text-sm pointer-event-none"></i>
            </button>
        </div>
    );
};

export default Tags;