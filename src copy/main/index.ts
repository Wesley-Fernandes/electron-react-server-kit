import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { Server, Socket } from 'socket.io'
import icon from '../../resources/icon.png?asset'
import database from './prisma'

const io = new Server({
  cors: {
    origin: '*'
  }
})
io.on('connection', (socket: Socket) => {
  console.log('Client connected')

  socket.emit('hello', 'You connected')

  socket.on('create-ronda', async (data) => {
    await database.ronda
      .create({ data })
      .then(() => {
        socket.emit('success', 'Sucesso ao criar ronda')
      })
      .catch((error) => {
        console.error(error)
        socket.emit('error', 'Falha ao criar ronda')
      })
  })

  socket.on('create-ronda-service', async (data) => {
    try {
      await database.rondas.create({ data })
      socket.emit('success', 'Serviço criado com sucesso!')
    } catch (error) {
      console.error(error)
      socket.emit('error', 'Falha ao recuperar rondas!')
    }
  })

  socket.on('get-all-rondas', async () => {
    try {
      const datas = await database.ronda.findMany()
      socket.emit('receive-all-rondas', datas)
    } catch (error) {
      console.error(error)
      socket.emit('error-response', 'Falha ao recuperar rondas')
    }
  })

  socket.on('update-ronda-service', async ({ id, data }) => {
    try {
      console.log('Atualizando...')
      await database.rondas.update({
        where: { id: id },
        data
      })

      socket.emit('update-ronda-service-response', {
        message: 'Sucesso ao atualizar.',
        success: true
      })
    } catch (error) {
      console.error(error)
      socket.emit('update-ronda-service-response', {
        message: 'Falha ao atualizar.',
        success: false
      })
    }
  })

  socket.on('get-ronda-service', async ({ id }) => {
    console.log('Pegando archivo...')
    const data = await database.rondas.findUnique({
      where: { id: id },
      include: {
        ronda: true
      }
    })

    socket.emit('send-ronda-service-response', data)
  })

  socket.on('filter-rondas-services', async (selectedDate) => {
    try {
      console.log('Pegando muitos arquivos...')
      const startOfDay = new Date(selectedDate)
      startOfDay.setUTCHours(0, 0, 0, 0)

      const endOfDay = new Date(selectedDate)
      endOfDay.setUTCHours(23, 59, 59, 999)
      const datas = await database.rondas.findMany({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay
          }
        },
        include: {
          ronda: true
        }
      })

      socket.emit('receive-all-rondas', datas)
    } catch (error) {
      console.error(error)
      socket.emit('error-response', 'Falha ao recuperar rondas')
    }
  })

  socket.on('delete-ronda', async (id: string) => {
    try {
      await database.ronda.delete({ where: { id } })
      socket.emit('success', 'Ronda deletado com sucesso!')
    } catch (error) {
      console.error(error)
      socket.emit('error-response', 'Falha ao deletar ronda.')
    }
  })
})

io.listen(3001)
console.log(io)

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on(
    'browser-window-created',
    (
      _: {
        preventDefault: () => void
        readonly defaultPrevented: boolean
      },
      window: Electron.BrowserWindow
    ) => {
      optimizer.watchWindowShortcuts(window)
    }
  )

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('web-contents-created', (e, wc) => {
  // wc: webContents of <webview> is now under control
  wc.setWindowOpenHandler((handler) => {
    return { action: 'allow' } // deny or allow
  })
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
