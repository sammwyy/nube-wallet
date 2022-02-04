const path = require("path");
require("@electron/remote/main").initialize();

const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");

let win = null;

function createWindow() {
  win = new BrowserWindow({
    title: "Nube Wallet",
    icon: path.join(__dirname, "public", "logo.png"),
    width: 1080,
    height: 620,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      sandbox: false,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("command", (_event, command) => {
  if (command === "close") {
    win.close();
  } else if (command === "minimize") {
    win.minimize();
  } else if (command === "maximize") {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});
