
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react';


export default function JumperBackButton() {
  const navigate = useNavigate()
  const jump = () =>{
    navigate(-1)
  }

  return (
  <Button variant="outline" size="icon" onClick={jump}>
    <ArrowLeft/>
  </Button>
  )
}
