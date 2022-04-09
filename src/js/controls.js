const { ipcRenderer, shell, remote } = require('electron'); 

var closeButton = document.getElementById("close")
closeButton.addEventListener("click", async function (e) {
    ipcRenderer.send('close-window');
}); 

var miniButton = document.getElementById("mini")
miniButton.addEventListener("click", function (e) {
    ipcRenderer.send('minimize-window');
}); 

var maxiButton = document.getElementById("maxi")
maxiButton.addEventListener("click", function (e) {
    ipcRenderer.send('maximize-window');
}); 

function Version() {
    document.getElementById("version").innerText = require("../../package.json").buildVersion;  
}
Version();