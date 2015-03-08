var board;
var time = 0;

function loop() {
    setInterval(function() {
        time += 1;
        run();
        paint();
    }, 600);
}

function run() {
    board.run();
}

function paint() {
    board.paint();
}

function init() {
    board = new Board();
    loop();
}

window.onload = function() {
    init();
};

document.onkeydown = function(e) {
    board.keyPressed(e.keyCode)
};
