import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { BriefcaseBusiness, Fan, Gift, Hotel, Menu, ShieldHalf, Unplug } from "lucide-react";
import { Button } from "./ui/button";
import Linker from "./Linker";
import SignOut from "./SignOut";
import useAuth from "@/hooks/useAuth";
import ButtonSuccess from "./ButtonSuccess";


export default function Navbar() {
    const user = useAuth()
  return (
    <header className="h-14 border-b flex items-center justify-between px-2">
        <h1 className="font-black text-lg">DARK VOICE</h1>

            {user && (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <Menu/>
                        </Button>
                    </SheetTrigger>
                <SheetContent className="flex flex-1 flex-col">
                <SheetHeader className="flex flex-1">
                <SheetTitle>MENU</SheetTitle>
                <SheetDescription className="flex flex-1 flex-col">
                    <ButtonSuccess/>
                    <ul>
                        <Linker href="/auth/home">
                            <Fan size={20}/>Inicio
                        </Linker>
                        <Linker href="/auth/patrollers">
                            <ShieldHalf size={20} />Gerenciar rondas
                        </Linker>
                        <Linker href="/auth/condominiums">
                            <Hotel size={20} />Gerenciar condominios
                        </Linker>
                        <Linker href="/auth/generators">
                            <Unplug size={20}/>Gerenciar geradores
                        </Linker>
                        <Linker href="/auth/events">
                            <Gift size={20} />Gerenciar eventos
                        </Linker>
                        <Linker href="/auth/services">
                            <BriefcaseBusiness size={20}/>Meus serviços
                        </Linker>
                    </ul>
                </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <SignOut/>
                </SheetFooter>
            </SheetContent>
        </Sheet>
            )}
            
    </header>
  )
}
