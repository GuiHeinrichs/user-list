import api from "../../services/api.js"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function ListarUsuarios() {
    const [userList, setUserList] = useState([]);
    const token = localStorage.getItem("token");
    async function loadUsers() {
        const reqObject = {headers: { Authorization: `Bearer ${token}`}};
        const {data:userList} = await api.get("/list", reqObject);
        setUserList(userList);
        return userList;
    }

    useEffect(() => {
        loadUsers().then(response => {
            console.log(response);
        });
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Listagem de usuários</h2>
            <ul className="space-y-2">
                {userList && userList.map((user) => (
                    <li className="bg-gray-100 p-4 rounded-md hover:bg-gray-200" key={user.id}>
                        <p className="font-semibold">Id: {user.id}</p>
                        <p className="font-semibold">Nome: {user.name}</p>
                        <p className="font-semibold">Email: {user.email}</p>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center items-center mt-6">
                <Link to="/login" className="text-center bg-blue-500 w-1/2 text-white py-2 px-4 rounded-md hover:bg-blue-400">Voltar</Link>
            </div>
        </div>
    )
}