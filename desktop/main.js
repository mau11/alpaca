const electron = require('electron');
const Menu = electron.Menu;
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;


const path = require('path');
const url = require('url');

// The menu bar template
const template = [
  {
    label: app.getName(), // This isn't working as expected
    submenu: [
    {
      role: 'about'
    },
    {
      type: 'separator'
    },
    {
      role: 'quit'
    }]
  },
  {
    label: 'Games',
    submenu: [
    {
      label: 'Regular Quiz',
      click: function() {
        mainWindow.loadURL('http://localhost:1337/#/prebuiltQuiz');
      }
    },
    {
      label: 'Car Quiz',
      click: function() {
        mainWindow.loadURL('http://localhost:1337/#/carQuizGame');
      }
    },
    {
      label: 'Racer Quiz',
      click: function() {
        mainWindow.loadURL('http://localhost:1337/game/v4.final.html');
      }
    },
    {
      label: '3D Racer Quiz',
      click: function() {
        mainWindow.loadURL('http://localhost:1337/hex/index.html');
      }
    },
    {
      label: 'Wolfenstein 3D',
      click: function() {
        mainWindow.loadURL('http://localhost:1337/wolf/index.html');
      }
    }]
  },
  {
    label: 'Pages',
    submenu: [{
      label: 'Manage Quizzes',
      accelerator: 'CommandOrControl+M',
      click: function() {
        mainWindow.loadURL('http://localhost:1337/#/manageQuiz');
      }
    }, {
      label: 'Build Quizzes',
      accelerator: 'CommandOrControl+B',
      click: function() {
        mainWindow.loadURL('http://localhost:1337/#/addQuiz');
      }
    }, {
      label: 'Games',
      accelerator: 'CommandOrControl+G',
      click: function() {
        mainWindow.loadURL('http://localhost:1337/#/gameOverview');
      }
    }, {
      label: 'My Results',
      accelerator: 'CommandOrControl+R',
      click: function() {
        mainWindow.loadURL('http://localhost:1337/#/myResults');
      }
    }]
  },
  {
    label: 'Edit',
    submenu: [{
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    }, {
      label: 'Redo',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    }, {
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: 'Select All',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    }]
  }
];

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 1100, height: 750});

  mainWindow.loadURL('http://localhost:1337/');


  mainWindow.on('closed', function () {
    mainWindow = null;
  });

}

app.on('ready', function() {
  createWindow();

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Keyboard shortcuts
  globalShortcut.register('CommandOrControl+M', function () {
    mainWindow.loadURL('http://localhost:1337/#/manageQuiz')
  });

  globalShortcut.register('CommandOrControl+B', function () {
    mainWindow.loadURL('http://localhost:1337/#/addQuiz')
  });

  globalShortcut.register('CommandOrControl+G', function () {
    mainWindow.loadURL('http://localhost:1337/#/gameOverview')
  });

  globalShortcut.register('CommandOrControl+R', function () {
    mainWindow.loadURL('http://localhost:1337/#/myResults')
  });

});

app.on('will-quit', function () {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
