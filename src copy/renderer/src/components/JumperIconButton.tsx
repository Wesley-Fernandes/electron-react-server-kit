
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { ReactNode } from 'react';

interface Props{
  href: string;
  children: ReactNode;
}
export default function JumperIconButton({children, href}:Props) {
  const navigate = useNavigate()
  const jump = () =>{
    navigate(href)
  }

  return (
  <Button variant="outline" size="icon" onClick={jump}>
    {children}
  </Button>
  )
}
