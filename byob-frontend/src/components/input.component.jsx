import { useState } from "react"

const InputBox = ({name,type,id,value,placeholder,icon}) => {

    const [ passwordVisible, setpassVisible] =  useState(false);

    return (
       <div className="relative w-[100%] mb-3">

            <input 
                name={name}
                type={type =="password" ? passwordVisible ? "text" : "password" : type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="input-box"
             />
             <i className={"fi "+ icon +" text-emerald-500 text-2xl input-icon"}></i>

             
             {
                type == "password" ?

                <i className={"fi fi-ss-"+ (!passwordVisible ? "eye" : "eye-crossed") + " text-gray-700 text-2xl input-icon left-[auto] right-4 cursor-pointer"} 
                
                    onClick={() => setpassVisible(currentval => !currentval)}

                ></i>

                : ""
             }

       </div>
    )
}

export default InputBox;