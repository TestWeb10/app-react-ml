import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const { isAuthenticated, logOut, userUsername } = useAuth()

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to='/home'>
                <h1 className="text-2xl font-bold">CFDI</h1>
            </Link>
            <ul className="flex gap-x-2">
                {
                    isAuthenticated ? (
                        <>
                            <li>
                                Bienvenido '{userUsername}'
                            </li>
                            <li>
                                <Link to='/login' className="m-2 p-2 w-40 font-semibold text-xs bg-blue-600 rounded-md" onClick={() => {
                                    logOut()
                                }}>Cerrar sesion</Link>
                            </li>
                        </>
                    ) : null
                }
            </ul>
        </nav>
    )
}

export default Navbar