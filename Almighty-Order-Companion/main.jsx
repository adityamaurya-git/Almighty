
const { app, BrowserWindow, session, shell } = require("electron");

const DASHBOARD_URL =
  "https://almightyhyperlocal.in/almighty/partner/dashboard";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    title: "ALMIGHTY Order Companion",
    autoHideMenuBar: true,
    backgroundColor: "#ffffff",

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,

      // Keep the dashboard renderer active when minimized.
      backgroundThrottling: false
    }
  });

  // Allow website notification permission requests.
  session.defaultSession.setPermissionRequestHandler(
    (_webContents, permission, callback) => {
      callback(permission === "notifications");
    }
  );

  // Keep external websites out of the companion window.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) {
      shell.openExternal(url);
    }

    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith("https://almightyhyperlocal.in/")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.loadURL(DASHBOARD_URL);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Closing the app stops its alerts. Minimizing does not.
app.on("window-all-closed", () => {
  app.quit();
});
