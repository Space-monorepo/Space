"use client"

import { useState } from "react"

export default function ConnectButton() {

    const [status, setStatus] = useState(3); // 0 = conectar-se, 1 = solicitado, 2 = conectado, 3 = editar

    const getLabel = () => {
        if (status === 0) return "Conectar-se";
        if (status === 1) return "Solicitado";
        if (status === 2) return "Conectado";
        if (status === 3) return "Editar Perfil";
    };

    const handleClick = () => {
        if (status === 0) setStatus(1); // clicar conectar-se vai pra solicitado"
        if (status === 1) setStatus(0); // clicar no solicitado vai pra conectar-se"
        if (status === 2) setStatus(0); // clicar no conectado vai pra conectar-se"
    };

    return (
        <div>
            {status === 2 && (
                <button className="w-50 h-10 rounded-sm bg-black text-zinc-200 hover:bg-gray-800">
                    Enviar Mensagem
                </button>
            )}

            <button
                onClick={handleClick}
                className={`w-50 h-10 rounded-sm  transition m-4 
            ${status === 1 || status === 2 || status===3 ? "bg-zinc-300 hover:bg-zinc-400 text-black" : "bg-black hover:bg-gray-800 text-zinc-200"}`}
            >

                {getLabel()}

            </button>



        </div>

    )
}