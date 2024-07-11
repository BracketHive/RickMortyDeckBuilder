import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  new BrowserWindow({
    webPreferences: {
      devTools: false,
    },
    autoHideMenuBar: true,
    width: 2000,
    height: 1500,
    title: 'Rick & Morty Deck Builder',
  }).loadURL(process.env.VITE_DEV_SERVER_URL)
})
