

export default function IpcExample() {
    const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  return (
    <button onClick={ipcHandle}>ping</button>
  )
}
