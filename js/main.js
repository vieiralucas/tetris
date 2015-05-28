var board;
var time = 0;
var loop;
var restartButton;
var hint;

function startLoop() {
    loop = setInterval(function() {
        time += 1;
        run();
        paint();
    }, 600);
}

function stopLoop() {
    clearInterval(loop);
    restartButton.style.display = 'inline-block';
}

function restart() {
    stopLoop();
    board.clear();
    restartButton.style.display = 'none';
    startLoop();
}

function run() {
    board.run();
}

function paint() {
    board.paint();
}

function init() {
    restartButton = document.querySelector('.restart-btn');
    restartButton.onclick = restart;
    board = new Board();
    hint = document.querySelector('.hint');
    hint.style.opacity = 1;
    document.querySelector('.hint-ok').onclick = function() {
        hint.style.display = 'none';
        startLoop();
    }
}

window.onload = function() {
    init();
};

document.onkeydown = function(e) {
    board.keyPressed(e.keyCode)
};
