const electron = require('electron');
const mainWindow = require('./main.js');
const globalShortcut = electron.globalShortcut;

function enable() {
  console.log('mainWindow:', mainWindow.loadURL);
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
}

module.exports = enable;
