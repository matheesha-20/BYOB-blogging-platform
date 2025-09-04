const InputBox = ({name,type,id,value,placeholder,icon}) => {
    return (
       <div className="relative w-[100%] mb-3">

            <input 
                name={name}
                type={type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="input-box"
             />
             <i className={"fi "+ icon +" text-emerald-500 text-2xl input-icon"}></i>

       </div>
    )
}

export default InputBox;