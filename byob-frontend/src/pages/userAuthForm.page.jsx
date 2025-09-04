import InputBox from "../components/input.component";
const UserAuthForm = ({type}) => {
    return (
        <section className="h-screen flex items-center justify-center">
            <form className="w-[80%] max-w-[400px]">
                <h1 className="text-center mb-20  text-4xl md:text-5xl font-bold mb-4">
                    {type == "sign-in" ? "Welcome Back" : "Join Us Today"}
                </h1>

                {
                    type == "sign-up" ?
                    <>
                    <InputBox 
                        name="full name"
                        type="text"
                        placeholder="Full Name"
                        icon="fi-sr-user"
                    />

                    <InputBox 
                        name="email"
                        type="text"
                        placeholder="Email"
                        icon="fi-sr-circle-envelope"
                    />

                    <InputBox 
                        name="password"
                        type="password"
                        placeholder="Password"
                        icon="fi-sr-key"
                    />

                    </>
                    

                    : ""

                }

            </form>

        </section>
    )
}

export default UserAuthForm;