
export default function IpcExample() {
    const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  return (
    <button onClick={ipcHandle} className="border-2 px-4 py-2 rounded font-bold bg-zinc-700 border-zinc-800 text-white">IpcExample</button>
  )
}
