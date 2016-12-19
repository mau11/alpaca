const electron = require('electron');
const Menu = electron.Menu;
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// The menu bar template
const template = [
  {
    label: 'Cats', // This isn't working as expected
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
  }
];

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 1100, height: 750});

  mainWindow.loadURL('http://localhost:1337/');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  console.log(process.platform);
}

app.on('ready', function() {
  createWindow();

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

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

