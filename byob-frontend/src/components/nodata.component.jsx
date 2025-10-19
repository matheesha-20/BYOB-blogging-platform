import React from "react";

const NoDataMessage = ({ message }) => {
    return (
        <div className="w-full flex justify-center items-center py-12 px-4">
            {/* The Modern Card Container */}
            <div className="
                max-w-md w-full 
                bg-white 
                border border-slate-200 
                rounded-xl 
                shadow-xl 
                p-8 md:p-10 
                text-center
            ">
                
                {/* Icon for Visual Emphasis (Using Font Awesome/Icon library class 'fi fi-rr-folder-open' as an example) */}
                <div className="flex justify-center mb-6">
                    <i className="
                        fi fi-rr-folder-open 
                        text-5xl 
                        text-emerald-500 
                        p-3 
                        bg-emerald-50 
                        rounded-full 
                        border border-emerald-200
                    "></i>
                </div>

                {/* Message Content */}
                <h1 className="
                    text-2xl md:text-3xl 
                    font-extrabold 
                    text-slate-800 
                    mb-2
                ">
                    No Content Found
                </h1>
                
                {/* Dynamic Message */}
                <p className="
                    text-lg 
                    text-slate-500
                ">
                    {message || "It looks like there's nothing here yet. Check back soon!"}
                </p>

            </div>
        </div>
    );
};

export default NoDataMessage;