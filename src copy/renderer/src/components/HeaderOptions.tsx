import { ReactNode } from "react"

interface Props{
    children: ReactNode;
}
export default function HeaderOptions({children}:Props) {
  return (
    <header className="h-14 flex items-center justify-end w-full px-2 gap-2">
        {children}
    </header>
  )
}
