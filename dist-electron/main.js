import { app as e, BrowserWindow as r } from "electron";
e.whenReady().then(() => {
  new r({
    webPreferences: {
      devTools: !1
    },
    autoHideMenuBar: !0,
    width: 2e3,
    height: 1500,
    title: "Rick & Morty Deck Builder"
  }).loadURL(process.env.VITE_DEV_SERVER_URL);
});
