import { useState } from "react";

const InPageNavigation = ({ routes, defaultHidden, children }) => {

    let [inPageNavIndex, setInPageNavIndex] = useState(0);



    

    return (
        <>
        <nav className="relative mb-8 border-b border-grey flex flex-nowrap p-4 rounded shadow mb-6 overflow-x-auto">
            {
                routes.map((route, index) => (
                   <button key={index}
                        className={"px-5 text-slate-600 " + (defaultHidden.includes(route) ? "md:hidden" : "")}
                        onClick={() => setInPageNavIndex(index)}
                        style={inPageNavIndex === index ? { borderBottom: "3px solid #2b9572ff", color: "#333534ff", fontWeight: "600" } : { borderBottom: "1px solid transparent", color: "#374151", fontWeight: "500"  }}
                    >
                        {route}

                   </button> 
                ))
            }
        </nav>

        { Array.isArray(children) ? children[inPageNavIndex] : children }

        </>
        
    );
}
export default InPageNavigation;