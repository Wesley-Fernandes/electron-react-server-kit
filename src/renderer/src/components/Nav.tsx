import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="h-14 border-b w-screen flex items-center justify-center">
        <ul className="flex gap-4 font-medium ">
            <li className="hover:font-bold hover:text-blue-500"><Link to="/">Inicio</Link></li>
            <li className=""><Link to="/status">Status</Link></li>
        </ul>
    </nav>
  )
}
