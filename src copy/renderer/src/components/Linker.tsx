import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";


interface Props{
    href: string;
    children: ReactNode;
}
export default function Linker({children, href}:Props) {
    const navigate = useNavigate();

    const handle = () =>{
        navigate(href)
        console.log('Linker clicked')
    }
  return (
    <li className="cursor-pointer py-1 flex items-center gap-1 text-sm hover:text-blue-600" onClick={handle}>{children}</li>
  )
}
