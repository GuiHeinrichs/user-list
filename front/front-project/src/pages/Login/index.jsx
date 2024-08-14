import { Link, useNavigate } from "react-router-dom"
import {useRef} from "react";

import api from "../../services/api.js";

export default function Login() {
    const userEmail = useRef();
    const userPassword = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const dataObject = {
            email: userEmail.current.value,
            password: userPassword.current.value,
        }
        try {
            const { data:token } = await api.post("/login", dataObject);
            localStorage.setItem("token", token);
            navigate("/lista");

        } catch {
            alert("Senha ou e-mail inválidos.");
        }
    }
    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                <input ref={userEmail} type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                <input ref={userPassword} type="password" placeholder="Senha" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"/>
                <button type={"submit"} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">
                    Login
                </button>
            </form>
            <Link to="/" className="flex justify-center text-blue-700 hover:underline mt-4">
                Não tem uma conta? Cadastre-se
            </Link>
        </div>
    )
}