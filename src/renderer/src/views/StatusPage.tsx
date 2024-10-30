import { useState } from 'react'

export default function StatusPage(): JSX.Element {
  const [status, setStatus] = useState<boolean>(false)

  const getData = async () => {
    const data = await fetch('http://localhost:2000/')
    const response = await data.json()
    if (data.status === 200) {
      console.log('Data has been getted.')
      setStatus(response.online)
      return
    } else {
      console.log('Data have not getted.')
      setStatus(response.online)
      return
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center flex-col">
      <h1 className='font-black text-4xl uppercase'>Verificar status</h1>
      <p className='mb-4 w-96 p-2 rounded-md shadow-md bg-gray-500 border-gray-700 border-2 text-gray-100 text-sm'>Uma simples pagina de exemplo para demostrar como receber status da API. Se ao clicar em verificar status a api ficar <strong className='text-green-400'>VERDE</strong> logo após, significa que o servidor está recebendo e respondendo sua requisição.</p>
      <div className="flex items-center gap-4">
        <button
          onClick={getData}
          className="border-2 px-4 py-2 rounded font-bold bg-zinc-700 border-zinc-800 text-white"
        >
          Verificar status
        </button>
        {status ? (
          <span className="w-8 h-8 bg-green-700 rounded-full border-4 border-zinc-600"></span>
        ) : (
          <span className="w-8 h-8 bg-red-700 rounded-full border-4 border-zinc-600"></span>
        )}
      </div>
    </section>
  )
}
