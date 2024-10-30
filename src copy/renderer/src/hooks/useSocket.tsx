import { createContext, useEffect, useRef, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

// Definindo o tipo para o contexto
interface SocketContextType {
    socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const socket = useRef<Socket | null>(null);

    useEffect(() => {
        // Inicializando o socket.io
        const ws = io("http://localhost:3001");
        socket.current = ws;

        // Evento de conexão com o servidor
        socket.current.on("connection", () => {
            console.log("Connected to server");
        });

        socket.current.on("hello", () => {
            toast.success("Connected to server");
            socket.current?.emit("try-success")
        });

        // Exemplo de ouvinte para o evento "response"
        socket.current.on('response', (data) => {
            console.log('Resposta recebida:', data);
        });

        // Emitindo um evento "hello"
        socket.current.on("error", (message:string)=>{
            toast.error(message)
        });
        socket.current.on("success", (message:string)=>{
            toast.success(message)
        });

        // Cleanup: desconectar ao desmontar o componente
        return () => {
            socket.current?.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket: socket.current }}>
            {children}
        </SocketContext.Provider>
    );
};
