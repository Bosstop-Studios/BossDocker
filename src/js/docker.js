var exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

var term = new Terminal({
    //cursorStyle: "bar",
    cursorBlink: "block"
});

const pathdir = path.join(__dirname + '../../../containers/bd1')

var curr_line = "";
var entries = [];
term.open(document.getElementById("terminal"));

window.onload = () => {
    var dir = './containers/bd1';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    term.write('HOi from \x1B[1;3;31mBossDocker\x1B[0m')
    term.write("\r\n");
    term.write("Docker$ ");
}

document.getElementById("dir-btn").onclick = () => {
    console.log(pathdir)
    shell.openPath(pathdir)
}

var input = document.getElementById("terminal-input");

input.addEventListener("keyup", function(key, event) {
    if (key.keyCode === 13) {

        let coffeeProcess = exec(input.value, {
            cwd: pathdir
        });

        coffeeProcess.stdout.on('data', function(data) {
           term.write("\r\n");
           term.write(data); 
        });

        coffeeProcess.stderr.on('data', function(data) {
            term.write("\r\n");
            term.write(data); 
        });

        coffeeProcess.on('exit', function (code) { 
            term.write("\r\n");
            term.write("Docker$ ");
        });
    }
});

/*
term.on("key", function(key, ev) {
    //Enter
    if(ev.keyCode === 13) {
        if(curr_line) {
            entries.push(curr_line);
            console.log(entries)
            console.log(entries.map(x => x).join(" "))
            term.write("\r\n");
            term.write("Docker$ ");
            curr_line = "";
        }
    } else if (ev.keyCode === 8) {
        // Backspace
        if (curr_line) {
            curr_line = curr_line.slice(0, curr_line.length - 1);
            term.write("\b \b");
        }
    } else {
        curr_line += key;
        term.write(key);
    }
});
*/